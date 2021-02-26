// a variable for start time
let secondsLeft = 76;

//the element that displays the time
let timer = document.getElementById("timer");

//div for high scores
let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

//button for high scores
let viewScoresBtn = document.getElementById("view-scores")

//start button div
let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);


// variable for the questions title
var questionDiv = document.getElementById("question-div");

// div to hold the results
let results = document.getElementById("results");

// div for the choices
var choices = document.getElementById("choices");


// an array to store high scores
let emptyArray = [];

// the array of high scores from local storage
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

// keeping track of which question we're on
var questionCount = 0;

//keeping score
let score = 0



viewScores();

var questions = [
    {
      title: "Which man is is responible for the start of the 7 Years War (aka the French and Indian War in the US)?",
      multiChoice: ["George Washington", "Henry Davis", "Lord Byron", "Paul Revere"],
      answer: "George Washington"
    },
  
    {
      title: "The Doomsday Book was a survey of the taxes of England owed to the previous king, requested after which conquest?",
      multiChoice: ["The Roman Conquest", "The Saxon Migration", "The Viking Invasion", "The Norman Conquest"],
      answer: "The Norman Conquest"
    },
  
    {
      title: "The Eastern Roman Empire (aka The Byzantine Empire) fell to the Ottoman Empire in what year?",
      multiChoice: ["476CE", "125BCE", "1784CE", "1453CE"],
      answer: "1453CE"
    },
  
    {
      title: "The Three Kingdoms Period in what is now modern day China began with the fall of the Han Dynasty, but ended with the begining of which Dynasty?",
      multiChoice: ["Xia", "Zhau", "Jin", "Tang"],
      answer: "Jin"
    },
  
    {
      title: "In 1853 US Commadore Matthew Perry forced the Japanese Shogunate to open trade with the US under threat of what?",
      multiChoice: ["A Full Trade Embargo", "Preference of trade with China", "Naval Artillery Bombardment", "A Diplomatic Incident"],
      answer: "Naval Artillery Bombardment"
    }
  ];