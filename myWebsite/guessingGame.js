/*
    Student Name: Marissa Bell
    File Name: guessingGame.js
    Date: 11/3/2024
*/



    let randomNumber;
    let attemptsLeft;
    const guessForm = document.getElementById('guessForm');
    const previousGuesses = [];


    function startNewGame(){
        randomNumber = Math.floor((Math.random()*100)+1);
        attemptsLeft = 10;
        previousGuesses.length = 0;
        alert("The game has been reset! Try to guess the new number!");
    }

    startNewGame();

// Define Function
function guessNumber(userGuess) {
    // Check validity of guess
    if (userGuess < 1 || userGuess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return; // Exit the function if the guess is invalid
    }

    
    previousGuesses.push(userGuess); // Store the guess
    attemptsLeft--; // Decrease the number of attempts left

    // Check the guess
    if (userGuess === randomNumber) {
        alert("Yay! You've guessed the number correctly!");
        startNewGame(); // Start a new game on correct guess
    } else if (attemptsLeft > 0) {
        
        if (userGuess < randomNumber) {
            alert(`Incorrect! Your guess is too low. You now have ${attemptsLeft} attempts left.`);
        } else {
            alert(`Incorrect! Your guess is too high. You now have ${attemptsLeft} attempts left.`);
        }
        alert(`Your previous guesses: ${previousGuesses.join(', ')}`); // Show previous guesses
    } else {
        alert(`Sorry, you've run out of attempts! The correct number was ${randomNumber}.`);
        startNewGame(); 
    }
}

    

guessForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const guessInput = document.getElementById("guessInput");
    const userGuess = Number(guessInput.value); // Recieve the user's guess as a number.

    guessNumber(userGuess);


    guessInput.value ='';
});

