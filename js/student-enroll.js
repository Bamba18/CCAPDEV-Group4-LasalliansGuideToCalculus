// sample classes (joined = the student is already in it)
const classes = [
    {
        code: "CAL1-N24-7QX2",
        name: "Calculus 1",
        section: "N24",
        teacher: "Maria Santos",
        students: 42,
        description: "Limits, derivatives, and their applications.",
        joined: true
    },
    {
        code: "CAL2-N25-4MB9",
        name: "Calculus 2",
        section: "N25",
        teacher: "Jose Rizal",
        students: 31,
        description: "More applications of calculus.",
        joined: false
    },
    {
        code: "ENGC-S11-2KD5",
        name: "Engineering Calculus",
        section: "S11",
        teacher: "Maria Santos",
        students: 14,
        description: "Calculus for engineering problems.",
        joined: false
    }
];

let foundClass = null;


function showMessage(text, isError)
{
    const message = $("#enroll-message");

    message.text(text);
    message.removeClass("alert-success alert-danger");

    if (isError)
    {
        message.addClass("alert-danger");
    }
    else
    {
        message.addClass("alert-success");
    }

    message.prop("hidden", false);
}


function showJoinedClasses()
{
    const list = $("#joined-list");
    list.empty();

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i].joined)
        {
            const column = $("<div class='col-12 col-md-6 col-lg-4 mb-4'></div>");
            const card = $("<div class='classroom-card'></div>");

            card.append($("<h3 class='classroom-title'></h3>").text(classes[i].name));
            card.append($("<span class='badge-section align-self-start'></span>").text("Section " + classes[i].section));
            card.append($("<p class='classroom-meta'></p>").text("Teacher: " + classes[i].teacher));
            card.append("<a href='student-assignments.html' class='btn btn-pill-action mx-0 align-self-start'>View assignments</a>");

            column.append(card);
            list.append(column);
        }
    }
}


function findClass(event)
{
    event.preventDefault();

    const code = $("#invite-code").val().trim().toUpperCase();

    foundClass = null;
    $("#class-preview").prop("hidden", true);

    if (code === "")
    {
        showMessage("Please enter an invite code.", true);
        return;
    }

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i].code === code)
        {
            foundClass = classes[i];
        }
    }

    if (foundClass === null)
    {
        showMessage("Class not found. Check your invite code.", true);
        return;
    }

    $("#preview-name").text(foundClass.name);
    $("#preview-section").text("Section " + foundClass.section);
    $("#preview-teacher").text(foundClass.teacher);
    $("#preview-students").text(foundClass.students);
    $("#preview-description").text(foundClass.description);
    $("#class-preview").prop("hidden", false);

    if (foundClass.joined)
    {
        $("#enroll-button").prop("disabled", true).text("Already enrolled");
        showMessage("You are already in this class.", false);
    }
    else
    {
        $("#enroll-button").prop("disabled", false).text("Enroll in this class");
        showMessage("Class found!", false);
    }
}


function enrollClass()
{
    if (foundClass === null || foundClass.joined)
    {
        return;
    }

    foundClass.joined = true;
    foundClass.students++;

    $("#preview-students").text(foundClass.students);
    $("#enroll-button").prop("disabled", true).text("Already enrolled");

    showMessage("You are now enrolled in " + foundClass.name + "!", false);
    showJoinedClasses();
}


$(document).ready(function ()
{
    showJoinedClasses();

    $("#enroll-form").on("submit", findClass);
    $("#enroll-button").on("click", enrollClass);
});
