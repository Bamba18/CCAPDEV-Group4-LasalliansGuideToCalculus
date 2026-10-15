// sample students (group "" = no group yet)
const students = [
    { name: "Juan Dela Cruz", group: "Gradients" },
    { name: "Ana Reyes", group: "Gradients" },
    { name: "Carlo Mendoza", group: "Limits" },
    { name: "Bea Villanueva", group: "Limits" },
    { name: "Miguel Torres", group: "" },
    { name: "Sofia Lim", group: "Tangents" }
];

const groups = [
    { name: "Gradients", madeBy: "teacher" },
    { name: "Limits", madeBy: "teacher" },
    { name: "Tangents", madeBy: "students" }
];


function showMessage(text)
{
    $("#page-message").text(text).prop("hidden", false);
}


// "Juan Dela Cruz" -> "JD"
function getInitials(name)
{
    const words = name.split(" ");
    const first = words[0].charAt(0);
    const last = words[words.length - 1].charAt(0);

    return first + last;
}


function countMembers(groupName)
{
    let count = 0;

    for (let i = 0; i < students.length; i++)
    {
        if (students[i].group === groupName)
        {
            count++;
        }
    }

    return count;
}


function showStudents()
{
    const search = $("#student-search").val().trim().toLowerCase();
    const list = $("#student-list");
    list.empty();

    for (let i = 0; i < students.length; i++)
    {
        if (!students[i].name.toLowerCase().includes(search))
        {
            continue;
        }

        // group dropdown for this student
        const select = $("<select class='custom-select custom-select-sm w-auto group-select'></select>");
        select.attr("data-index", i);
        select.attr("aria-label", "Group of " + students[i].name);
        select.append("<option value=''>No group yet</option>");

        for (let j = 0; j < groups.length; j++)
        {
            select.append($("<option></option>").val(groups[j].name).text(groups[j].name));
        }

        select.val(students[i].group);

        const nameCell = $("<td><div class='d-flex align-items-center'></div></td>");
        nameCell.find("div").append($("<span class='user-avatar-badge mr-2'></span>").text(getInitials(students[i].name)));
        nameCell.find("div").append($("<span class='member-name'></span>").text(students[i].name));

        const removeButton = $("<button type='button' class='btn-table-delete remove-button'>Remove</button>").attr("data-index", i);

        const row = $("<tr></tr>");
        row.append(nameCell);
        row.append($("<td></td>").append(select));
        row.append($("<td class='text-right'></td>").append(removeButton));

        list.append(row);
    }

    $("#students-title").text("STUDENTS (" + students.length + ")");
    $("#class-count").text(students.length + " students • " + groups.length + " groups");
}


function showGroups()
{
    const list = $("#group-list");
    list.empty();

    for (let i = 0; i < groups.length; i++)
    {
        const item = $("<li class='d-flex justify-content-between align-items-center border-bottom py-2'></li>");

        const info = $("<div></div>");
        info.append($("<div class='member-name font-weight-bold'></div>").text(groups[i].name));
        info.append($("<div class='group-meta-sub mb-0'></div>").text("Made by " + groups[i].madeBy + " • " + countMembers(groups[i].name) + " members"));

        const deleteButton = $("<button type='button' class='btn-table-delete delete-group'>Delete</button>").attr("data-index", i);

        item.append(info);
        item.append(deleteButton);
        list.append(item);
    }

    if (groups.length === 0)
    {
        list.append("<li class='text-no-group'>No groups yet.</li>");
    }

    $("#groups-title").text("GROUPS (" + groups.length + ")");
}


function changeGroup()
{
    const index = Number($(this).attr("data-index"));
    students[index].group = $(this).val();

    showGroups();
    showMessage(students[index].name + " was moved.");
}


function removeStudent()
{
    const index = Number($(this).attr("data-index"));
    const name = students[index].name;

    if (!confirm("Remove " + name + " from this class?"))
    {
        return;
    }

    students.splice(index, 1);

    showStudents();
    showGroups();
    showMessage(name + " was removed from the class.");
}


function addGroup(event)
{
    event.preventDefault();

    const name = $("#group-name").val().trim();

    if (name === "")
    {
        return;
    }

    for (let i = 0; i < groups.length; i++)
    {
        if (groups[i].name.toLowerCase() === name.toLowerCase())
        {
            showMessage("There is already a group named " + name + ".");
            return;
        }
    }

    groups.push({ name: name, madeBy: "teacher" });
    $("#group-name").val("");

    showStudents();
    showGroups();
    showMessage("Group " + name + " was added.");
}


function deleteGroup()
{
    const index = Number($(this).attr("data-index"));
    const name = groups[index].name;

    if (!confirm("Delete the group " + name + "?"))
    {
        return;
    }

    // students in this group go back to no group
    for (let i = 0; i < students.length; i++)
    {
        if (students[i].group === name)
        {
            students[i].group = "";
        }
    }

    groups.splice(index, 1);

    showStudents();
    showGroups();
    showMessage("Group " + name + " was deleted.");
}


function copyInvite()
{
    const link = $("#invite-link").val();

    navigator.clipboard.writeText(link);
    $("#copy-button").text("Copied!");
}


function changeAssigned()
{
    if ($("#assign-switch").is(":checked"))
    {
        $("#due-date").prop("disabled", false);
        showMessage("Tangent lines is now assigned to this class.");
    }
    else
    {
        $("#due-date").prop("disabled", true);
        showMessage("Tangent lines is no longer assigned to this class.");
    }
}


function changeStudentGroups()
{
    if ($("#student-groups-switch").is(":checked"))
    {
        showMessage("Students can now make their own groups.");
    }
    else
    {
        showMessage("Only you can make groups now.");
    }
}


$(document).ready(function ()
{
    showStudents();
    showGroups();

    $("#student-search").on("input", showStudents);
    $("#group-form").on("submit", addGroup);
    $("#copy-button").on("click", copyInvite);
    $("#assign-switch").on("change", changeAssigned);
    $("#student-groups-switch").on("change", changeStudentGroups);
    $("#due-date").on("change", function ()
    {
        showMessage("Due date changed to " + $("#due-date").val() + ".");
    });

    // rows and groups are made by js so the events are put on the lists
    $("#student-list").on("change", ".group-select", changeGroup);
    $("#student-list").on("click", ".remove-button", removeStudent);
    $("#group-list").on("click", ".delete-group", deleteGroup);
});
