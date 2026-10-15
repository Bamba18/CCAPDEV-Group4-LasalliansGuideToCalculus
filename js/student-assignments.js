// right answers for the 2 questions
const answerOne = "4";
const answerTwo = "horizontal";


function submitExercise(event)
{
    event.preventDefault();

    const pickedOne = $("input[name='question-1']:checked").val();
    const pickedTwo = $("input[name='question-2']:checked").val();

    // nothing picked = undefined
    if (pickedOne === undefined || pickedTwo === undefined)
    {
        $("#exercise-error").text("Please answer both questions.").prop("hidden", false);
        return;
    }

    let score = 0;

    if (pickedOne === answerOne)
    {
        score = score + 5;
    }

    if (pickedTwo === answerTwo)
    {
        score = score + 5;
    }

    // move the card from pending to completed
    $("#score").text(score + " / 10");
    $("#submitted-time").text(new Date().toLocaleString());

    $("#pending-card").prop("hidden", true);
    $("#no-pending").prop("hidden", false);
    $("#completed-card").prop("hidden", false);
    $("#no-completed").prop("hidden", true);

    $("#pending-tab").text("Pending (0)");
    $("#completed-tab").text("Completed (1)");

    $("#exercise-popup").modal("hide");
    $("#completed-tab").tab("show");

    $("#assignment-message").text("Submitted! Your score is " + score + " / 10.").prop("hidden", false);
}


$(document).ready(function ()
{
    $("#exercise-form").on("submit", submitExercise);
});
