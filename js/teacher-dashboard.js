const green = "#0a5b37";
const lightGreen = "#1a7c55";
const yellow = "#f0a500";


function makeStudentsChart()
{
    new Chart($("#students-chart"), {
        type: "bar",
        data: {
            labels: ["Calculus 1", "Calculus 2", "Eng Calc"],
            datasets: [{
                label: "Students",
                data: [42, 31, 14],
                backgroundColor: green
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}


function makeViewsChart()
{
    new Chart($("#views-chart"), {
        type: "line",
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: "Views",
                data: [32, 41, 38, 55, 47, 18, 9],
                borderColor: green,
                backgroundColor: "rgba(10, 91, 55, 0.15)",
                fill: true
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}


function makeGroupsChart()
{
    new Chart($("#groups-chart"), {
        type: "doughnut",
        data: {
            labels: ["Made by teacher", "Made by students"],
            datasets: [{
                data: [9, 5],
                backgroundColor: [lightGreen, yellow]
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}


$(document).ready(function ()
{
    makeStudentsChart();
    makeViewsChart();
    makeGroupsChart();
});
