import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
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
    get(child(dbRef, "/" + uid + "/reports/")).then((snapshot) => {
       snapshot.forEach(function(child) {
           let date = child.key;
           date = date.replaceAll(":", "/")
           $("#reports").append('<tr>'
               + '<td>' + date + '</td>'
               + '<td><button>Export</button></td>'
               + '</tr>'
           )
       });

        let data = $("tr");
        for (let i = 1; i < data.length; i++) {
            data.eq(i).find("td").eq(1).find("button:first").attr("id", i);
        }
    });
}

$(document).on("click", "button", function() {
    let reportBody = $("#reportBody")
    reportBody.empty();
    reportBody.append('<tr>\n' +
        '            <td>Name</td>\n' +
        '            <td>Check in time</td>\n' +
        '        </tr>')
    let userCount = 0;
    let dateSelected = $("tr").eq(parseInt(this.id)).find("td").eq(0).text();
    dateSelected = dateSelected.replaceAll("/", ":")
    get(child(dbRef, "/" + uid + "/reports/" + dateSelected + "/")).then((snapshot) => {
        snapshot.forEach(function (child) {
            userCount++;
            let user = child.key;
            let checkedInTime = child.val().sign_in_time;
            reportBody.append('<tr>'
                + '<td>' + user + '</td>'
                + '<td>' + checkedInTime + '</td>'
                 + '</tr>'
            )
            console.log(user + " " + checkedInTime);
        });
        reportBody.append('<tr>'
            + '<td><strong>Total: </strong></td>'
            + '<td><strong>' + userCount + '</strong></td>'
            + '</tr>'
        )

        let printWindow = window.open('', '');
        printWindow.document.write('<html lang="en-US"><head><title>Export for ' + dateSelected + '</title><style>' +
            'table, th, td {\n' +
            '    width: 100%;\n' +
            '    border: 2px solid #000000;\n' +
            '}\n' +
            'td {\n' +
            '    width: 33%;\n' +
            '    padding: 10px;\n' +
            '}' +
            '</style>');
        reportBody.show();
        printWindow.document.write('</head><body><table>');
        printWindow.document.write(reportBody.html());
        printWindow.document.write('</table></body></html>');
        printWindow.print();
        printWindow.close();
        reportBody.hide();

    })
})