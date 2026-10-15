// used by student-profile.html and teacher-profile.html
function saveProfile(event)
{
    event.preventDefault();

    const firstName = $("#first-name").val().trim();
    const lastName = $("#last-name").val().trim();
    const message = $("#profile-message");

    if (firstName === "" || lastName === "")
    {
        message.removeClass("alert-success").addClass("alert-danger");
        message.text("Please fill in your first and last name.").prop("hidden", false);
        return;
    }

    $("#full-name").text(firstName + " " + lastName);

    message.removeClass("alert-danger").addClass("alert-success");
    message.text("Profile saved!").prop("hidden", false);
}


$(document).ready(function ()
{
    $("#profile-form").on("submit", saveProfile);
});
