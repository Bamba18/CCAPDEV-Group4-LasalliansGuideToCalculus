// ===== DASHBOARD CHARTS =====
// sample numbers only; classroom behavior will be added during JavaScript practice

// draws the number of students in each classroom
function createStudentsChart()
{
    new Chart(document.getElementById("students-chart"), {
        type: "bar",
        data: {
            labels: ["Calc 1 · N24", "Calc 2 · N25", "Eng Calc · S11"],
            datasets: [{
                label: "Students",
                data: [42, 31, 14],
                backgroundColor: "#006a3a"
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// draws sample topic views over seven days
function createViewsChart()
{
    new Chart(document.getElementById("views-chart"), {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Topic views",
                data: [32, 41, 38, 55, 47, 18, 9],
                borderColor: "#006a3a",
                backgroundColor: "rgba(0, 106, 58, 0.15)",
                fill: true
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

// compares teacher-created groups with student-created groups
function createGroupsChart()
{
    new Chart(document.getElementById("groups-chart"), {
        type: "doughnut",
        data: {
            labels: ["Made by teacher", "Made by students"],
            datasets: [{
                data: [9, 5],
                backgroundColor: ["#006a3a", "#f0b323"]
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false
        }
    });
}

$(document).ready(function ()
{
    if (typeof Chart === "undefined")
    {
        $("#chart-error").prop("hidden", false);
        return;
    }

    createStudentsChart();
    createViewsChart();
    createGroupsChart();
});
