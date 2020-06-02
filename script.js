var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text")); 
var questionCounterText = document.getElementById("question-counter");
var timerDisplay = document.getElementById("timer");

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var fiveMinutes = 60 * 5;

const correctBonus = 10;
const maxQuestions = 5;


function startTimer(duration, timerDisplay) {
    var time = duration, minutes, seconds;

    setInterval(function() {
        minutes = parseInt(time / 60, 10);
        seconds = parseInt(time % 60, 10);

        minutes = minutes < 10 ? minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerDisplay.textContent = minutes + ":" + seconds;

        if (--time < 0) {
            //Take user to the end screen and save score if time is up
            localStorage.setItem("mostRecentScore", score);
            return window.location.assign("end.html");
            
        };
    }, 1000);

    //Click events for answers exist inside startTimer so incorrect answers can deduct time from clock
    choices.forEach(function(choice){
        choice.addEventListener("click", function(e){
            if(!acceptingAnswers){
                return;
            }
        
            acceptingAnswers = false;
            var selectedChoice = e.target;
            var selectedAnswer = parseInt(selectedChoice.dataset["number"]);
    
            if(selectedAnswer === currentQuestion.answer){
                //Each question is worth 10 points (because a score of 50 feels better than a score of 5)
                score = score + correctBonus;
            }
            else {
                //Deduct time from clock
                alert("Uh oh! Wrong answer! A minute will be deducted from the clock.");
                time = time - 60;
            }
    
            getNewQuestion();
        });
    });
};

//Set an initial timer starting at 5 minutes
startTimer(fiveMinutes, timerDisplay);

var questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        choice1: "<script>",
        choice2: "<a>",
        choice3: "<js>",
        choice4: "<div>",
        answer: 1
    },
    {
        question: "A Javascript confirm method will return a...",
        choice1: "prompt",
        choice2: "boolean",
        choice3: "if/else",
        choice4: "script",
        answer: 2
    },
    {
        question: "How do you create a function called myFunction in Javascript?",
        choice1: "function() myFunction",
        choice2: "function! myFunction()",
        choice3: "myFunction()",
        choice4: "function myFunction()",
        answer: 4
    },
    {
        question: "How do you invoke a function named 'myTest'?",
        choice1: "call myTest()",
        choice2: "myTest()",
        choice3: "invoke myTest()",
        choice4: "myTest",
        answer: 2
    },
    {
        question: "In Javascript '||' stands for...",
        choice1: "and",
        choice2: "if",
        choice3: "or",
        choice4: "not",
        answer: 3
    }
];

function startQuiz() {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    if(availableQuestions === 0 || questionCounter >= maxQuestions){
        //Set mostRecentScore to user's current score
        localStorage.setItem("mostRecentScore", score);
        //Go to end page
        return window.location.assign("end.html");
    }

    questionCounter++;

    questionCounterText.textContent = questionCounter + "/" + maxQuestions;

    //Randomly selecting question from questions array
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    question.textContent = currentQuestion.question;

    choices.forEach(function(choice) {
        var number =  choice.dataset["number"];
        choice.textContent = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

startQuiz();