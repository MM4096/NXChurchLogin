function CheckLogin() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "test" && password == "test") {
        window.open("contents.html", "_self");
        $("#error").text("");
    }
    else {
        $("#error").text("incorrect username or password");
    }
}