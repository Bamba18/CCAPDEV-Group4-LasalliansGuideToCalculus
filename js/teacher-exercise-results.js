// ===== ASSIGNMENT RESULTS CHART =====

// draws the sample scores shown in the results table
function createScoresChart()
{
    new Chart(document.getElementById("scores-chart"), {
        type: "bar",
        data: {
            labels: ["0 / 10", "5 / 10", "10 / 10"],
            datasets: [{
                label: "Students",
                data: [1, 1, 2],
                backgroundColor: "#006a3a"
            }]
        },
        options: {
            animation: false,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
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

    createScoresChart();
});
