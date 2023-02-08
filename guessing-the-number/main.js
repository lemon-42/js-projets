const submitButton  = document.getElementById("submit");
const result = document.getElementById("result");
const guessInput = document.getElementById("guess");

const correctNumber = Math.floor(Math.random() * 100) + 1;
let numberOfGuesses = 0;

submitButton.addEventListener("click", () => {
    const guess = parseInt(guessInput.value);
    numberOfGuesses++;

    if (guess === correctNumber) {
        result.innerHTML = "Bien joué ! Tu as trouvé le nombre mystère en " + numberOfGuesses + " essais.";
    } else if (guess < correctNumber) {
        result.innerHTML = "Ton nombre est trop petit.";
    } else {
        result.innerHTML = "Ton nombre est trop grand.";
    }
});