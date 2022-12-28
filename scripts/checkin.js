$(document).ready(function() {
    let users = $(".user");
    for (i = 0; i < users.length; i++) {
        $(".user").eq(i).find("button:first").attr("id", i);
    }
})

$(document).on("click", "button", function() {
    var currentTime = new Date();
    $(".user").eq(parseInt(this.id)).find("p").eq(1).text("Last checked in: "
    + currentTime.getDate() + "/"
    + (currentTime.getMonth() + 1) + "/"
    + currentTime.getFullYear() + ", "
    + currentTime.getHours() + ":"
    + currentTime.getMinutes()
    );
})

function Search() {
    let input = $("#search").val();
    let users = $(".user");
    
    for (i = 0; i < users.length; i++) {
        if ($(".user").eq(i).find("p").eq(0).text().toLowerCase().includes(input)) {
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