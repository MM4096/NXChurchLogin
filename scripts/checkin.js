import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvNYjdEMLq50uSdDCLigP0D0CHkv_js7Y",
    authDomain: "churchlogin-76a14.firebaseapp.com",
    databaseURL: "https://churchlogin-76a14-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "churchlogin-76a14",
    storageBucket: "churchlogin-76a14.appspot.com",
    messagingSenderId: "480350080928",
    appId: "1:480350080928:web:bb48169cf6a9b3cc6bdec5"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(database);

const auth = getAuth();

let uid = "";

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        Ready();
    } else {
        window.location.href = "index.html";
    }
});

function Ready() {
    let currentTime = new Date();
    let date = currentTime.getDate() + ":" + currentTime.getMonth() + ":" + currentTime.getFullYear();
    get(child(dbRef, "/" + uid + "/users/")).then((snapshot) => {
        snapshot.forEach(function(child) {
            let name = child.val().name;
            let lastCheckedIn = child.val().last_signed_in;
            let buttonText = "Check in";
            if (lastCheckedIn === "null" || lastCheckedIn === "") {
                lastCheckedIn = "never";
            }
            $("#users").append(
                '<div class="user">'
                + '<p><strong>' + name + '</strong></p>'
                + '<p> Last checked in: ' + lastCheckedIn +' </p>'
                + '<button class="userButton">' + buttonText + '</button>'
                + '</div>'
            );
        })

        let users = $(".user");
        for (let i = 0; i < users.length; i++) {
            $(".user").eq(i).find("button:first").attr("id", i);
        }
    });

}

$(document).on("click", "button", function() {
    let currentTime = new Date();
    console.log(currentTime);
    let minutes = currentTime.getMinutes();
    console.log(minutes);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let dateSyntax = currentTime.getDate() + "/"
        + (currentTime.getMonth() + 1) + "/"
        + currentTime.getFullYear() + ", "
        + currentTime.getHours() + ":"
        + minutes
    let date = currentTime.getDate() + ":" + currentTime.getMonth() + ":" + currentTime.getFullYear();
    let time = currentTime.getHours() + ":" + minutes;
    let username = $(".user").eq(parseInt(this.id)).find("p").eq(0).text();

    get(child(dbRef, "/" + uid + "/reports/" + date + "/" + username + "/")).then((snapshot) => {
        if (snapshot.exists()) {
            alert("User already logged in!");
        }
        else {
            $(".user").eq(parseInt(this.id)).find("p").eq(1).text("Last checked in: " + dateSyntax);
            update(ref(database, uid + "/users/" + username + "/"), {
                last_signed_in: dateSyntax,
            });
            set(ref(database, uid + "/reports/" + date + "/" + username + "/"), {
                sign_in_time: time,
            });
        }
    })
})

function Search() {
    let input = $("#search").val();
    let users = $(".user");
    
    for (let i = 0; i < users.length; i++) {
        if (users.eq(i).find("p").eq(0).text().toLowerCase().includes(input)) {
            $(".user").eq(i).show();
        }
        else {
            users.eq(i).hide();
        }
    }
}

function Clear() {
    $("#search").val("");
    Search();
}

window.Search = Search;
window.Clear = Clear;