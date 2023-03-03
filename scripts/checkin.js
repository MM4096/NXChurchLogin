import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

$(function() {
    get(child(dbRef, "/users/")).then((snapshot) => {
        snapshot.forEach(function(child) {
            let name = child.val().name;
            let lastCheckedIn = child.val().last_signed_in;
            if (lastCheckedIn === "null" || lastCheckedIn === "") {
                lastCheckedIn = "never";
            }
            $("#users").append(
                '<div class="user">'
                + '<p><strong>' + name + '</strong></p>'
                + '<p> Last checked in: ' + lastCheckedIn +' </p>'
                + '<button class="userButton">Check in</button>'
                + '</div>'
            );
        })

        let users = $(".user");
        for (let i = 0; i < users.length; i++) {
            $(".user").eq(i).find("button:first").attr("id", i);
        }
    });

})

$(document).on("click", "button", function() {
    let currentTime = new Date();
    let dateSyntax = currentTime.getDate() + "/"
        + (currentTime.getMonth() + 1) + "/"
        + currentTime.getFullYear() + ", "
        + currentTime.getHours() + ":"
        + currentTime.getMinutes()
    $(".user").eq(parseInt(this.id)).find("p").eq(1).text("Last checked in: " + dateSyntax);
    let username = $(".user").eq(parseInt(this.id)).find("p").eq(0).text();

    update(ref(database, "/users/" + username), ("last_signed_in": dateSyntax))
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