function CheckLogin() {
    var username = $("#username").val();
    var password = $("#password").val();
    // enable the following lines for actual usage
    /*
    if (username == "test" && password == "test") {
        window.open("contents.html", "_self");
        $("#error").text("");
    }
    else {
        $("#error").text("incorrect username or password");
    }
    */
   window.open("contents.html", "_self");
}