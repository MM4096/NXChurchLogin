import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        window.location.href = "contents.html";
    } else {
        console.log("User is signed out");
    }
});

$(function() {
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
    }
})

function Login() {
    let errorText = "";
    let username = $("#username").val();
    let password = $("#password").val();
    setPersistence(auth, browserLocalPersistence).then(() => {
        console.log("here!")
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Logged in!");
                window.open("contents.html", "_self");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorCode) {
                    case "auth/invalid-email":
                        errorText = "Error: Invalid email";
                        break;
                    case "auth/user-not-found":
                        errorText = "Error: No account with that email";
                        break;
                    case "auth/wrong-password":
                        errorText = "Error: Incorrect password";
                        break;
                    default:
                        errorText = "An unknown error occured. Check the console for more details";
                        console.error(errorMessage);
                        break;
                }
                $("#error").text(errorText);
            });
    })
    .catch((error) => {
        console.error("Error: " + error.message);
    });
}

window.Login = Login;