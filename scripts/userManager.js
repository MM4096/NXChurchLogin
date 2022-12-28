$(document).ready(function() {
    let users = $(".user");
    for (i = 0; i < users.length; i++) {
        $(".user").eq(i).find("button:first").attr("id", i);
    }
})

$(document).on("click", "button", function() {
    var selectedId = this.id;
    if (this.id == null || this.id == "" || this.id == undefined) {
        return;
    }
    console.log("Updated user id: " + this.id
    + "\nName: " + $(".user").eq(selectedId).find("input").eq(0).val()
    + "\nGender: " + $(".user").eq(selectedId).find("input").eq(1).val()
    + "\nYear Level: " + $(".user").eq(selectedId).find("input").eq(2).val()
    + "\nParents: " + $(".user").eq(selectedId).find("input").eq(3).val()
    + "\nContact: " + $(".user").eq(selectedId).find("input").eq(4).val()
    + "\nNotes: " + $(".user").eq(selectedId).find("textarea").val()
    );
})

function Search() {
    let input = $("#search").val();
    let users = $(".user");
    
    for (i = 0; i < users.length; i++) {
        if ($(".user").eq(i).find("input:first").val().toLowerCase().includes(input)) {
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
    var name = $(".newUser").eq(0).find("input").eq(0).val();
    var gender = $(".newUser").eq(0).find("input").eq(1).val();
    var year = $(".newUser").eq(0).find("input").eq(2).val();
    var parents = $(".newUser").eq(0).find("input").eq(3).val();
    var contact = $(".newUser").eq(0).find("input").eq(4).val();
    var email = $(".newUser").eq(0).find("input").eq(5).val();
    var notes = $(".newUser").eq(0).find("textarea").val();
    if (name == "" || gender == "" || year == "" || parents == "" || contact == "") {
        alert("Some fields weren't filled in!");
        return;
    }
    $(".newUser").eq(0).find("input").eq(0).val("");
    $(".newUser").eq(0).find("input").eq(1).val("");
    $(".newUser").eq(0).find("input").eq(2).val("");
    $(".newUser").eq(0).find("input").eq(3).val("");
    $(".newUser").eq(0).find("input").eq(4).val("");
    $(".newUser").eq(0).find("input").eq(5).val("");
    $(".newUser").eq(0).find("textarea").eq(0).val("");
    $("#users").append(
        '<div class="user">'
        + '<p>Name: </p>'
        + '<input tpye="text" value="' + name + '">'
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
        + '<button class="userManagerUpdate">Update</button>'
        + '</div>'
    );
}