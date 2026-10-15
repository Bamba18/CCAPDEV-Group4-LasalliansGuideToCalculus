// sample classrooms of the teacher
// due "" = the exercise is not assigned to that class
const classes = [
    {
        id: 1, name: "Calculus 1", section: "N24", code: "CAL1-N24-7QX2", students: 42, groups: 8, due: "Oct 20, 2026",
        results: [
            { name: "Ana Reyes", score: 5, time: "Oct 12, 2026 2:15 PM" },
            { name: "Carlo Mendoza", score: 10, time: "Oct 12, 2026 4:40 PM" },
            { name: "Bea Villanueva", score: 5, time: "Oct 13, 2026 9:05 AM" },
            { name: "Sofia Lim", score: 10, time: "Oct 13, 2026 10:30 AM" },
            { name: "Isabel Cruz", score: 10, time: "Oct 13, 2026 11:10 AM" },
            { name: "Paolo Garcia", score: 5, time: "Oct 13, 2026 1:20 PM" },
            { name: "Diego Luna", score: 0, time: "Oct 13, 2026 3:45 PM" }
        ]
    },
    {
        id: 2, name: "Calculus 2", section: "N25", code: "CAL2-N25-4MB9", students: 31, groups: 4, due: "Oct 25, 2026",
        results: [
            { name: "Mark Tan", score: 10, time: "Oct 14, 2026 8:00 AM" },
            { name: "Lea Ramos", score: 5, time: "Oct 14, 2026 9:45 AM" },
            { name: "Nico Santos", score: 0, time: "Oct 14, 2026 1:10 PM" }
        ]
    },
    {
        id: 3, name: "Engineering Calculus", section: "S11", code: "ENGC-S11-2KD5", students: 14, groups: 2, due: "",
        results: []
    }
];

let nextId = 4;

// 0 = making a new class, other number = id of the class being edited
let editingId = 0;

let scoresChart = null;


function showMessage(text, isError)
{
    const message = $("#class-message");

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


function findClass(id)
{
    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i].id === id)
        {
            return classes[i];
        }
    }

    return null;
}


function makeCode(name, section)
{
    // first 4 letters of the name + section + random number
    const start = name.substring(0, 4).toUpperCase();
    const number = Math.floor(Math.random() * 9000) + 1000;

    return start + "-" + section + "-" + number;
}


// ===== CLASSROOMS TAB =====

function showClasses()
{
    const list = $("#class-list");
    list.empty();

    if (classes.length === 0)
    {
        list.append("<p class='col-12 text-muted'>No classrooms yet. Make one using the form.</p>");
    }

    for (let i = 0; i < classes.length; i++)
    {
        const column = $("<div class='col-12 col-md-6 mb-4'></div>");
        const card = $("<div class='classroom-card'></div>");

        card.append($("<h2 class='classroom-title'></h2>").text(classes[i].name));
        card.append($("<span class='badge-section align-self-start'></span>").text("Section " + classes[i].section));
        card.append($("<p class='classroom-meta'></p>").text(classes[i].students + " students • " + classes[i].groups + " groups • Code: " + classes[i].code));

        const buttons = $("<div></div>");
        buttons.append("<a href='teacher-class-detail.html' class='btn btn-pill-action ml-0'>Open</a>");
        buttons.append($("<button type='button' class='btn-table-edit results-button mr-1'>Results</button>").attr("data-id", classes[i].id));
        buttons.append($("<button type='button' class='btn-table-edit edit-button mr-1'>Edit</button>").attr("data-id", classes[i].id));
        buttons.append($("<button type='button' class='btn-table-delete delete-button'>Delete</button>").attr("data-id", classes[i].id));

        card.append(buttons);
        column.append(card);
        list.append(column);
    }

    // the assignments tab dropdown also needs the new list
    fillClassDropdown();
}


function resetForm()
{
    editingId = 0;

    $("#class-name").val("");
    $("#class-section").val("");

    $("#form-title").text("CREATE A CLASSROOM");
    $("#save-button").text("Create classroom");
    $("#cancel-button").prop("hidden", true);
}


function saveClass(event)
{
    event.preventDefault();

    const name = $("#class-name").val().trim();
    const section = $("#class-section").val().trim().toUpperCase();

    if (name === "" || section === "")
    {
        showMessage("Please fill in the class name and section.", true);
        return;
    }

    if (editingId === 0)
    {
        classes.push({
            id: nextId,
            name: name,
            section: section,
            code: makeCode(name, section),
            students: 0,
            groups: 0,
            due: "",
            results: []
        });

        nextId++;
        showMessage("Classroom created!", false);
    }
    else
    {
        const classroom = findClass(editingId);
        classroom.name = name;
        classroom.section = section;

        showMessage("Classroom updated!", false);
    }

    resetForm();
    showClasses();
}


function editClass()
{
    const id = Number($(this).attr("data-id"));
    const classroom = findClass(id);

    editingId = id;

    $("#class-name").val(classroom.name);
    $("#class-section").val(classroom.section);

    $("#form-title").text("EDIT CLASSROOM");
    $("#save-button").text("Save changes");
    $("#cancel-button").prop("hidden", false);
}


function deleteClass()
{
    const id = Number($(this).attr("data-id"));
    const classroom = findClass(id);

    if (!confirm("Delete " + classroom.name + "?"))
    {
        return;
    }

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i].id === id)
        {
            classes.splice(i, 1);
            break;
        }
    }

    if (editingId === id)
    {
        resetForm();
    }

    showClasses();
    showResults();
    showMessage("Classroom deleted.", false);
}


// "Results" button on a card: open the assignments tab with that class picked
function viewResults()
{
    $("#results-class").val($(this).attr("data-id"));
    showResults();
    $("#assignments-tab").tab("show");
}


// ===== ASSIGNMENTS TAB =====

function fillClassDropdown()
{
    const dropdown = $("#results-class");
    const picked = dropdown.val();

    dropdown.empty();

    for (let i = 0; i < classes.length; i++)
    {
        dropdown.append($("<option></option>").val(classes[i].id).text(classes[i].name + " (" + classes[i].section + ")"));
    }

    // keep the same class picked if it still exists
    if (picked !== null && findClass(Number(picked)) !== null)
    {
        dropdown.val(picked);
    }
}


function makeChart()
{
    scoresChart = new Chart($("#scores-chart"), {
        type: "bar",
        data: {
            labels: ["0 / 10", "5 / 10", "10 / 10"],
            datasets: [{
                label: "Students",
                data: [0, 0, 0],
                backgroundColor: ["#c0392b", "#f0b429", "#0a5b37"]
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        }
    });
}


// "Ana Reyes" -> "AR"
function getInitials(name)
{
    const words = name.split(" ");
    const first = words[0].charAt(0);
    const last = words[words.length - 1].charAt(0);

    return first + last;
}


function showResults()
{
    const classroom = findClass(Number($("#results-class").val()));
    const list = $("#results-list");
    list.empty();

    if (classroom === null)
    {
        $("#assignment-info").text("No classrooms yet.");
        return;
    }

    if (classroom.due === "")
    {
        $("#assignment-info").text("Not assigned to this class yet.");
    }
    else
    {
        $("#assignment-info").text("2 questions • 10 points • Due " + classroom.due);
    }

    // numbers and chart use all results
    let total = 0;
    let zero = 0;
    let five = 0;
    let ten = 0;

    for (let i = 0; i < classroom.results.length; i++)
    {
        const score = classroom.results[i].score;
        total = total + score;

        if (score === 0)
        {
            zero++;
        }
        else if (score === 5)
        {
            five++;
        }
        else
        {
            ten++;
        }
    }

    let average = 0;
    if (classroom.results.length > 0)
    {
        average = (total / classroom.results.length).toFixed(1);
    }

    $("#submitted-count").text(classroom.results.length);
    $("#not-submitted-count").text(classroom.students - classroom.results.length);
    $("#average-score").text(average);
    $("#perfect-count").text(ten);

    scoresChart.data.datasets[0].data = [zero, five, ten];
    scoresChart.update();

    // table uses the search box and the score filter
    const search = $("#search-box").val().trim().toLowerCase();
    const filter = $("#score-filter").val();

    for (let i = 0; i < classroom.results.length; i++)
    {
        const result = classroom.results[i];
        const nameMatches = result.name.toLowerCase().includes(search);
        const scoreMatches = filter === "all" || result.score === Number(filter);

        if (nameMatches && scoreMatches)
        {
            const nameCell = $("<td><div class='d-flex align-items-center'></div></td>");
            nameCell.find("div").append($("<span class='user-avatar-badge mr-2'></span>").text(getInitials(result.name)));
            nameCell.find("div").append($("<span class='member-name'></span>").text(result.name));

            const row = $("<tr></tr>");
            row.append(nameCell);
            row.append($("<td class='font-weight-bold'></td>").text(result.score + " / 10"));
            row.append($("<td></td>").text(result.time));

            list.append(row);
        }
    }

    if (list.children().length === 0)
    {
        list.append("<tr><td colspan='3' class='text-no-group'>No submissions to show.</td></tr>");
    }
}


$(document).ready(function ()
{
    makeChart();
    showClasses();
    showResults();

    $("#class-form").on("submit", saveClass);
    $("#cancel-button").on("click", resetForm);

    // the cards are made by js so the click is put on the list
    $("#class-list").on("click", ".edit-button", editClass);
    $("#class-list").on("click", ".delete-button", deleteClass);
    $("#class-list").on("click", ".results-button", viewResults);

    $("#results-class").on("change", showResults);
    $("#search-box").on("input", showResults);
    $("#score-filter").on("change", showResults);

    // the classroom page links here with #assignments
    if (window.location.hash === "#assignments")
    {
        $("#assignments-tab").tab("show");
    }
});
