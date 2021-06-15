const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
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
  console.log("update wrong");
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
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

displayWord();
