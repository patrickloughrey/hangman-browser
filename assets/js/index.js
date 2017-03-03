/* Declare all variables */

/* DOM variables */
var startGame = document.getElementById('startGame');
var displayQuestion = document.getElementById('question');
var displayWords = document.getElementById('word');
var displayGuessesRemaining = document.getElementById('guessesRemaining');
var displayLetterGuessed = document.getElementById('letterGuessed');
var displayWins = document.getElementById('wins');

/* Logic variables */
var wins = 0;
var dashes = [];
var lettersGuessed = [];
var currQuestion = '';
var currAnswer = '';
var currAnswerArr = [];
var numOfGuesses = 8;
var lettersDisplay = ' ';


/* Yankees object that holds all game functions */
var yankees = {

  questions: [
      'Who is the longest tenured captain of the New York Yankees?', 
      'Which Yankee hit the most home runs in the World Series in his career?',
      'Who was the last Yankees pitcher to win World Series MVP?', 
      'Which Yankee player was hit by the most pitches in their career?',
      'Who is the only Yankee player to hit 4 home runs in a single game?',
      'What nickname was Derek Jeter given after hitting the game winning home run in Game 4 of the 2001 World Series after midnight of November 1st?',
      'What was the name of long time Yankees public address announcer?', 
      'Yankee Stadium is located in which borough of New York City?',
      'What team was Alex Rodriguez on before coming to the Yankees?'],

  answers: [
      'Derek Jeter', 
      'Mickey Mantle', 
      'Mariano Rivera', 
      'Derek Jeter', 
      'Lou Gehrig', 
      'Mr. November', 
      'Bob Sheppard', 
      'Bronx', 
      'Mariners'],
  
  /* Function to randomly choose a question */
  randomQuestion: function(min, max) {
      var random = Math.floor(Math.random() * (max - min + 1) + min);
      return random;
  },

  /* Function to dynamically allocate dashes */
  displayDashes: function(x) {

      var currQuestion = yankees.questions[num];
      var currAnswer = yankees.answers[num];
      var i = 0;


      while(i < currAnswer.length) {

          answersArr.push(yankees.answers[num][i].toUpperCase());
          var curr = yankees.answers[num][i];

          if(curr != ' ' || curr != '.') {
              dash.push('_');

          } else {
              dash.push(' ');
          }

          i++;
      }

      displayQuestion.innerHTML = currQuestion;
      displayWords.innerHTML = dash.join('');
  },

  /* Function that replaces dashes with correct letters the user inputs */
  displayLetters: function(input) {

      /* Use reduce() function to replace dash if input matches a letter in the current answer */
      var replaceIndex = currAnswerArr.reduce(function(letter, elem, match) {

          if(elem == input) {
              letter.push(match);
          }

          return letter;

      } []); 

      replaceIndex.forEach(function(i) {
          dash[i] = input;
      });

      displayWords.innerHTML = dash.join('');

  },

  /* Reset game function, re-initialize all variables */
  resetGame: function() {

      startGame.classList.remove('hidden');
      startGame.innerHTML = "Press any button to begin!";
      numOfGuesses = 8;
      wins = 0;
      newGame = 0;
      currAnswer = '';
      currQuestion = '';
      displayLetterGuessed = ' ';
      currAnswerArr = [];
      lettersGuessed = [];
      dashes = [];

      /* Hide all DOM elements */
      displayQuestion.classList.add('hidden');
      displayWords.classList.add('hidden');
      displayLetterGuessed.classList.add('hidden');
      displayGuessesRemaining.classList.add('hidden');
      displayWins.classList.add('hidden');

  },

  startGame: function() {

      /* Use Set Timeout to wait until game is reset */
      setTimeout(function() {

          var x = yankees.randomQuestion(0, 8);
          yankees.displayDashes(x);
          startGame.classList.add('hidden');
          displayQuestion.classList.remove('hidden');
          displayWords.classList.remove('hidden');
          displayLetterGuessed.classList.remove('hidden');
          displayGuessesRemaining.classList.remove('hidden');
          displayWins.classList.remove('hidden');

      }, 600);

  };

}; /* End of Yankees object */

yankees.resetGame();

/* Main Event Listener Function */
document.addEventListener('keypress', function() {

    var input = event.key;
    input = input.toUpperCase();
    currAnswer = currAnswerArr.toUpperCase();

    /* If user input is not a letter in current answer */
    if(currAnswer.indexOf(input) == -1) {

        /* If user has already guessed this letter */
        if(lettersGuessed.indexOf(input) == -1) {

            displayGuessesRemaining.innerHTML = numOfGuesses + ' Attempts Remaining';
            numOfGuesses--;

            
            if(numOfGuesses < 7) {
                console.log("You guessed the wrong letter!");
                lettersGuessed.push(input);
                lettersDisplay += input + " ";
                displayLetterGuessed.innerHTML = lettersDisplay;
            }


        } else {
            console.log("You guessed that letter already! Try a new letter this time!");

        }


    /* If user input is correct */
    } else {

          if(numOfGuesses == 8) {
              numOfGuesses--;
              displayGuessesRemaining.innerHTML = numOfGuesses + " Attempts Remaining";

          } else if(numOfGuesses <= 7) {
              yankees.displayLetters(input);
              /* console.log(input) */
          }

          /* If there are no dashes remaining, user has guessed word correctly */
          if(dashes.indexOf('_') == -1) {

              setTimeout(function() {
                  displayWords.innerHTML = "You win!";
                  displayQuestion.innerHTML = " ";
              }, 1200);

              setTimeout(function() {
                  wins++;
                  displayWins.innerHTML = "Wins: " + wins;
                  displayLetterGuessed.innerHTML = "";
                  lettersDisplay = " ";
                  lettersGuessed = [];
                  currAnswer = "";
                  currQuestion = "";
                  currAnswerArr = [];
                  dashes = [];

                  yankees.startGame();

              }, 1600);    
          }
    }

    /* Losing scenario */
    if(numOfGuesses < 1) {
        displayGuessesRemaining.innerHTML = "You lost!";
        lettersGuessed.innerHTML = "Press x to play again!";

        displayWords.innerHTML = "";
        displayQuestion.innerHTML = "";

        if(input == 'x') {
            yankees.resetGame();
        }
    }

    if(numOfGuesses == 7) {
        lettersGuessed.innerHTML = " ";
    }

    if(newGame == 1) {
        startGame.innerHTML = "Begin!";
        yankees.startGame();
    }

}); /* End of Listener Function */
