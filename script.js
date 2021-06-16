const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];
let selcetedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show the hidden word
function displayWord() {
  wordEl.innerHTML = `
        ${selcetedWord
          .split("")
          .map(
            (letter) => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>
        `
          )
          .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selcetedWord) {
    finalMessage.innerText = "Congratulations you won!";
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? `<p>Wrong</p>` : ""}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost.  Try again.";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selcetedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//restart game and play again
playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selcetedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
