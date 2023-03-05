import {signOut, getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {
        window.location.href = "index.html";
    }
});

function SignOut() {
    signOut(auth).then(() => {
        // signed out
    }).catch((error) => {
        console.log(error);
    });
}

window.SignOut = SignOut;