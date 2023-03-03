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
            let gender = child.val().gender;
            let year = child.val().year;
            let parents = child.val().parents;
            console.log(parents);
            let contact = child.val().contact;
            let email = child.val().email;
            let notes = child.val().notes;
            $("#users").append(
                '<div class="user">'
                + '<p>Name: </p>'
                + '<input type="text" value="' + name + '">'
                + '<br>'
                + '<p>Gender: </p>'
                + '<input type="text" value="' + gender + '" maxlength="1">'
                + '<br>'
                + '<p>Birthday: </p>'
                + '<input type="date" value="' + year +'">'
                + '<br>'
                + '<p>Parents: </p>'
                + '<input type="text" value="' + parents + '">'
                + '<br>'
                + '<p>Contact: </p>'
                + '<input type="text" value="' + contact + '">'
                + '<br>'
                + '<p>Email: </p>'
                + '<input type="email" value="' + email + '">'
                + '<br>'
                + '<p>Notes: </p>'
                + '<textarea>' + notes + '</textarea>'
                + '<br>'
                + '<button class="userManagerUpdate" onclick="UpdateUser()">Update</button>'
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
    let selectedId = this.id;
    if (this.id == null || this.id === "" || this.id === undefined) {
        return;
    }
    let user = $(".user");
    let name = user.eq(selectedId).find("input").eq(0).val();
    let gender = user.eq(selectedId).find("input").eq(1).val()
    let yearLevel = user.eq(selectedId).find("input").eq(2).val();
    let parents = user.eq(selectedId).find("input").eq(3).val();
    let contact = user.eq(selectedId).find("input").eq(4).val();
    let notes = user.eq(selectedId).find("textarea").val();
    let email = user.eq(selectedId).find("input").eq(5).val();

    set(ref(database, "/users/" + name + "/"), {
        name: name,
        gender: gender,
        year: yearLevel,
        parents: parents,
        contact: contact,
        email: email,
        notes: notes,
    });

    console.log("updated");
    console.log("Updated user id: " + this.id
    + "\nName: " + name
    + "\nGender: " + gender
    + "\nYear Level: " + yearLevel
    + "\nParents: " + parents
    + "\nContact: " + contact
    + "\nNotes: " + notes
    );
})

function Search() {
    let input = $("#search").val();
    let users = $(".user");
    
    for (let i = 0; i < users.length; i++) {
        if (users.eq(i).find("input:first").val().toLowerCase().includes(input)) {
            $(".user").eq(i).show();
        }
        else {
            $(".user").eq(i).hide();
        }
    }
}

function Clear() {
    $("#search").val("");
    Search();
}

function AddUser() {
    let newUser = $(".newUser");
    let name = newUser.eq(0).find("input").eq(0).val();
    let gender = newUser.eq(0).find("input").eq(1).val();
    let year = newUser.eq(0).find("input").eq(2).val();
    let parents = newUser.eq(0).find("input").eq(3).val();
    let contact = newUser.eq(0).find("input").eq(4).val();
    let email = newUser.eq(0).find("input").eq(5).val();
    let notes = newUser.eq(0).find("textarea").val();
    if (name === "" || gender === "" || year === "" || parents === "" || contact === "") {
        alert("Some fields weren't filled in!");
        return;
    }
    set(ref(database, "/users/" + name + "/"), {
        name: name,
        gender: gender,
        year: year,
        parents: parents,
        contact: contact,
        email: email,
        notes: notes,
        last_signed_in: "",
    });
    newUser.eq(0).find("input").eq(0).val("");
    newUser.eq(0).find("input").eq(1).val("");
    newUser.eq(0).find("input").eq(2).val("");
    newUser.eq(0).find("input").eq(3).val("");
    newUser.eq(0).find("input").eq(4).val("");
    newUser.eq(0).find("input").eq(5).val("");
    newUser.eq(0).find("textarea").eq(0).val("");
    $("#users").append(
        '<div class="user">'
        + '<p>Name: </p>'
        + '<input type="text" value="' + name + '">'
        + '<br>'
        + '<p>Gender: </p>'
        + '<input type="text" value="' + gender + '" maxlength="1">'
        + '<br>'
        + '<p>Birthday: </p>'
        + '<input type="date" value="' + year +'">'
        + '<br>'
        + '<p>Parents: </p>'
        + '<input type="text" value="' + parents + '">'
        + '<br>'
        + '<p>Contact: </p>'
        + '<input type="text" value="' + contact + '">'
        + '<br>'
        + '<p>Email: </p>'
        + '<input type="email" value="' + email + '">'
        + '<br>'
        + '<p>Notes: </p>'
        + '<textarea>' + notes + '</textarea>'
        + '<br>'
        + '<button class="userManagerUpdate" onclick="UpdateUser()">Update</button>'
        + '</div>'
    );
}

function UpdateUser() {

}

window.Search = Search;
window.Clear = Clear;
window.AddUser = AddUser;
window.UpdateUser = UpdateUser;