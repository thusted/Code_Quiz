var highScoresList = document.getElementById("highScoresList");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

for (i = 0; i < highScores.length; i++){
    var newScore = document.createElement("li");
    newScore.textContent = (highScores[i].name + " --- " + highScores[i].score);
    var a = document.createAttribute("class");
    a.value = "high-score";
    newScore.setAttributeNode(a);
    highScoresList.append(newScore);
};