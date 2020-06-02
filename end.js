var saveButton = document.getElementById("saveScoreButton");
var initials = document.getElementById("initials");
var mostRecentScore = localStorage.getItem("mostRecentScore")
var finalScore = document.getElementById("finalScore");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.textContent = "Congratulations! Your final score is: " + mostRecentScore;

initials.addEventListener("keyup", function(){
    saveButton.disabled = !initials.value;
});

saveButton.addEventListener("click", function(e){
    e.preventDefault();

    var score = {
        score: mostRecentScore,
        name: initials.value
    };

    highScores.push(score);

    //Will organize scores in order of highest to lowest
    highScores.sort(function(a,b){
        return b.score - a.score;
    });

    //Keep the top 10 scores
    highScores.splice(10);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    //Take user back to the homescreen
    window.location.assign("index.html");
});

