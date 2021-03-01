// Cleaned up all the varriables to ensure that they had a singular place and ease of access
var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var playAgain = document.getElementById('play-again');
var leaderBoardList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('high-scores');
var currentQuestionIndex;
var sec = 60;
var score = 0;

// Start button listener
startButton.addEventListener('click', startGame);

//used the random math functions I learned in the last homework with some ideas I got on W3 to make a random questions array
function shuffleArray(passedArray) {
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
    }
    return passedArray;
}

//Its the timer function for the quiz. I was unhappy with the score based on time so I went a different way for a cleaner look
function timer() {
    var timer = setInterval(function () {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        sec--;
    }, 1000);
}

// It's a blank array so that way it can be randomized similar to the last projects random array
var shuffled = [];

// This is the button that starts the game. It will also remove elements from being shown when started
function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

// this is the function that makes the random ordered questions appear
function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// funtion allows for the clearing of questions but not the loss of score
function clearoptions() {
    answerButtonsEl.innerHTML = "";
}

// Longer function chain that moves from one question to the next using event listners
function showQuestion(currentQuestionObject) {
    questionEl.textContent = currentQuestionObject.title;
    clearoptions();
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[0].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[0].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[1].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[1].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[2].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[2].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[3].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[3].correct);
    })
}

// Check to see if the user satatement is correct and to see if they have answered all of the questions. Couldn't quite 
// figure out how to add the line of text to the html, used alerts to signify answers instead
function selectAnswer(isCorrect) {
    if (isCorrect == true) {
        score += 10;
        alert('Correct');
    } else {
        sec -= 10;
        alert('Incorrect! Time Deducted');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("That's All the Questions! Lets see how you did");
        endQuiz();
    } else {
        showQuestion(shuffled[currentQuestionIndex]);
    }
}

// Ends the quiz and removes the timer element to show user score
function endQuiz() {
    sec = 0;
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userScore.textContent = 'Your total was ' + score + ' out of 70!';
}

// empty string and array for local storage of high scores
var initialsToAdd = "";
var highRollersClub = [];

// listener for the high score button and function to make it useful
submit.addEventListener('click', function (event) {
    event.preventDefault();
    showLeaderboard();
})

function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    highRollersClub.push(newScore);
    localStorage.setItem('highRollersClub', JSON.stringify(highRollersClub));
}

// This starts the game over is the user clicks "play again".
function startAgain() {
    sec = 60;
    score = 0;
    leaderboard.classList.add('hide');
    startGame();
}

// Makes the "play again" button clickable.
playAgain.addEventListener('click', function () {
    startAgain();
})

// Clears local storage if the user clicks "clear Scores".
function clearLeaderboard() {
    localStorage.clear();
    leaderBoardList.innerHTML = "";
}
clearScores.addEventListener('click', function () {
    clearLeaderboard();
})

// This hides all of the non-essential HTML elements and also populates the leaderboard with initials and scores from local storage.
function showLeaderboard() {
    initialsToAdd = userInitials.value;
    addScores(initialsToAdd, score);
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    leaderBoardList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("highRollersClub"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        leaderBoardList.append(newLeader);
    }
}

// Makes the "view high scores" text clickable.
leaderBoardButton.addEventListener('click', function () {
    startButton.classList.add('hide');
    description.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showLeaderboard();
});
console.log(highRollersClub)
console.log(scores)
// Where the all importat questions are housed, try not to cheat by looking at the answers
// Remember the old maxim "He who fails to learn from history is doomed to repeat it"
var questionArray = [

    {
        title: 'Which man is is responible for the start of the 7 Years War (aka the French and Indian War in the US)?',
        options: [
            { text: 'George Washington', correct: true },
            { text: 'Henry Davis', correct: false },
            { text: 'Lord Byron', correct: false },
            { text: 'Paul Revere', correct: false }
        ],
    }, {
        title: 'The Doomsday Book was a survey of the taxes of England owed to the previous king, requested after which conquest?',
        options: [
            { text: 'The Roman Conquest', correct: false },
            { text: 'The Saxon Migration', correct: false },
            { text: 'The Viking Invasion', correct: false },
            { text: 'The Norman Conquest', correct: true }
        ],
    }, {
        title: 'The Eastern Roman Empire (aka The Byzantine Empire) fell to the Ottoman Empire in what year?',
        options: [
            { text: '476 CE', correct: false },
            { text: '125 BCE', correct: false },
            { text: '1784 CE', correct: false },
            { text: '1453 CE', correct: true }
        ],
    }, {
        title: 'The Three Kingdoms Period in what is now modern day China began with the fall of the Han Dynasty, but ended with the begining of which Dynasty?',
        options: [
            { text: 'Xia', correct: false },
            { text: 'Zhau', correct: false },
            { text: 'Jin', correct: true },
            { text: 'Tang?', correct: false }
        ],
    }, {
        title: 'In 1853 US Commadore Matthew Perry forced the Japanese Shogunate to open trade with the US under threat of what?',
        options: [
            { text: 'A Full Trade Embargo', correct: false },
            { text: 'Preference of trade with China', correct: false },
            { text: 'Naval Artillery Bombardment', correct: true },
            { text: 'A Diplomatic Incident', correct: false }
        ],
    }, {
        title: 'The Russian Revolution was made possible by the proliferation of which of these global wars',
        options: [
            { text: 'World War 1 (The Great War)', correct: true },
            { text: 'The 7 years War', correct: false },
            { text: 'The American Revolution', correct: false },
            { text: 'The Napoleonic Wars', correct: false }
        ],
    }, {
        title: 'The Maratha Confederancy of the Indian-subcontinent was overthrown in 1818 by which power',
        options: [
            { text: 'The Mughal Empire', correct: false },
            { text: 'The Dutch East India Company', correct: false },
            { text: 'The Durrani Empire', correct: false },
            { text: 'The British East India Company', correct: true }
        ]
    }

    
  ];