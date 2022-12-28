$(document).ready(function() {
    let data = $("tr");
    for (i = 1; i < data.length; i++) {
        $("tr").eq(i).find("td").eq(2).find("button:first").attr("id", i);
    }
})

$(document).on("click", "button", function() {
    var currentTime = new Date();
    $("tr").eq(parseInt(this.id)).find("td").eq(1).text(
    currentTime.getDate() + "/"
    + (currentTime.getMonth() + 1) + "/"
    + currentTime.getFullYear()
    );
})