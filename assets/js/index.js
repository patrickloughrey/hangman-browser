/* Declare all variables */
var underscore = [];
var lettersGuessed = [];
var currentAnswerArr = [];
var currentAnswer = '';
var currentQuestion = '';
var lettersGuessedDisplay = ' ';
var wins = 0;
var guessNum = 6;
var newGame = 2;

/* DOM variables */
var startGame = document.getElementById('startgame');
var winDisplay = document.getElementById('wins');
var wordDisplay = document.getElementById('word');
var guessNumRemainDisplay = document.getElementById('guessNumRemain');
var guessedLettersDisplay = document.getElementById('guessedLetter');
var questionDisplay = document.getElementById('question');

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
      'What team was Alex Rodriguez on before coming to the Yankees?'
    ],
    answers: [
      'Derek Jeter', 
      'Mickey Mantle', 
      'Mariano Rivera', 
      'Derek Jeter', 
      'Lou Gehrig', 
      'Mr. November', 
      'Bob Sheppard', 
      'Bronx', 
      'Mariners'
    ],
    randomQuestion: function(min, max) {
        /* Generates random question */
        /* Still working out a bug that creates multiple questions to be chosen in certain cases */
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    /* Function that replaces dashes with correct letters the user inputs */
    displayUnderscore: function(x) {

        currentQuestion = yankees.questions[x];
        currentAnswer = yankees.answers[x];
        console.log(currentAnswer)

        for (var i = 0; i < currentAnswer.length; i++) {

            currentAnswerArr.push(yankees.answers[x][i].toUpperCase())

            var current = yankees.answers[x][i];

            if (current != ' ' && current != "'" && current != '.') {
                underscore.push('_');
            } else {
                underscore.push(' ');
            }
        }

        questionDisplay.innerHTML = currentQuestion;
        wordDisplay.innerHTML = underscore.join('');

    },

    showLetters: function(button) {

        /* Use reduce() function to replace dash if input matches a letter in the current answer */
        /* Bug may be with reduce, testing out different fuctions here */
        var replaceIndices = currentAnswerArr.reduce(function(a, e, i) {
            if (e == button)
                a.push(i)
            return a;
        }, [])

        replaceIndices.forEach(function(x) {
            underscore[x] = button
        })

        wordDisplay.innerHTML = underscore.join('')

    },

    /* Reset game function, re-initialize all variables */
    resetGame: function() {
        startGame.classList.remove('hidden')
        startGame.innerHTML = "Press any key to begin!";
        currentAnswerArr = [];
        wins = 0;
        guessNum = 6;
        lettersGuessed = [];
        currentAnswer = '';
        currentQuestion = '';
        newGame = 0;
        underscore = [];
        lettersGuessedDisplay = ' ';
        wordDisplay.classList.add('hidden');
        winDisplay.classList.add('hidden');
        guessNumRemainDisplay.classList.add('hidden');
        guessedLettersDisplay.classList.add('hidden');
        questionDisplay.classList.add('hidden')
    },

    startGame: function() {
        setTimeout(function() {
            var x = yankees.randomQuestion(0, 8)
            yankees.displayUnderscore(x)
            startGame.classList.add('hidden');
            winDisplay.classList.remove('hidden');
            wordDisplay.classList.remove('hidden');
            guessNumRemainDisplay.classList.remove('hidden');
            guessedLettersDisplay.classList.remove('hidden');
            questionDisplay.classList.remove('hidden');
        }, 500)
    }

}  /* End of Yankees object */

/* Begin game here */
yankees.resetGame();

/* Main Event Listener Function */
document.addEventListener('keypress', function() {

        var button = event.key;

        button = button.toUpperCase();
        currentAnswer = currentAnswer.toUpperCase();
        newGame++

        /* If user input is not a letter in current answer */
        if (currentAnswer.indexOf(button) == -1) { 

            /* If user has already guessed this letter */
            if (lettersGuessed.indexOf(button) == -1) { 
                guessNum--
                guessNumRemainDisplay.innerHTML = guessNum + ' Attempts Remaining';

                if (guessNum < 5) {
                    lettersGuessed.push(button) // push incorrect button press input
                    lettersGuessedDisplay += button + " ";
                    guessedLettersDisplay.innerHTML = lettersGuessedDisplay;
                    console.log('Wrong Letter')
                }
            } else {
                console.log("You guessed that letter already! Try a new letter this time!")
            }

        /* If user input is correct */
        } else { 

            if (guessNum == 6) {
                guessNum--
                guessNumRemainDisplay.innerHTML = guessNum + ' Attempts Remaining';
            } else if (guessNum <= 5) {
                yankees.showLetters(button)
                console.log(button, "Right Letter")
            }

            /* If there are no dashes remaining, user has guessed word correctly */
            if (underscore.indexOf('_') == -1) { 

                setTimeout(function() {
                    wordDisplay.innerHTML = 'You Win';
                    questionDisplay.innerHTML = '';
                }, 1200)

                setTimeout(function() {
                    wins++
                    winDisplay.innerHTML = "wins: " + wins;
                    underscore = [];
                    currentAnswerArr = [];
                    currentQuestion = '';
                    currentAnswer = '';
                    lettersGuessed = [];
                    lettersGuessedDisplay = ' ';
                    guessedLettersDisplay.innerHTML = ""

                    yankees.startGame()

                }, 1600)
            }
        }

        /* Losing scenario */
        if (guessNum < 1) { 
            guessNumRemainDisplay.innerHTML = "You Lost!";
            guessedLettersDisplay.innerHTML = "Press x to play again";

            wordDisplay.innerHTML = "";
            questionDisplay.innerHTML = "";

            if (button == 'X') {
                yankees.resetGame()
            }
        }

        if (guessNum == 5) { 
            guessedLettersDisplay.innerHTML = " ";
        }

        if (newGame == 1) {
            startGame.innerHTML = 'Begin!';
            yankees.startGame()
        }


})  /* End of Listener Function */
