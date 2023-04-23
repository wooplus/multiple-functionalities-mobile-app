const answerField = document.getElementById("answer-field");
const questionField = document.getElementById("question-field");
const flashContainerEl = document.getElementById("flash-container");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL: "https://mobileshoppingapp-58bfd-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const flashquizzInDB = ref(database, "flashQuizz");

document.getElementById("add-quiz-btn").addEventListener("click", (e) => {
  console.log("click");
  e.preventDefault();
  push(flashquizzInDB, [questionField.value, answerField.value]);
  clearInputsData();
  console.log("added to database");
});

onValue(flashquizzInDB, function (snapshot) {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    let itemsArr = Object.entries(snapshot.val());
    clearQuizzElements();
    for (let item of itemsArr) {
      appendQuizzElements(item);
    }
    // flipBackAction()
  } else {
    flashContainerEl.innerHTML = "No flashcards created yet...";
  }
});

function appendQuizzElements(item) {
  const itemID = item[0];
  const quizz = item[1];
  const [question, answer] = quizz;
  const newQuizz = document.createElement("div");
  newQuizz.classList.add("flashcard");
  newQuizz.innerHTML = ` <div class="front" id="front">
          <h2>Question</h2>
          <p>${question}</p>
        </div>
        <div class="back" id="back">
          <h2>Answer</h2>
          <p>${answer}</p>
        </div>`;
  flashContainerEl.appendChild(newQuizz);
  newQuizz.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(database, `flashQuizz/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
  newQuizz.addEventListener("click", (e) => {
    newQuizz.children[0].classList.toggle("d-none");
    newQuizz.children[1].classList.toggle("d-block");
  });
}

// function flipBackAction() {
//   let quizzes = document.getElementsByClassName("flashcard");
//   for (let quizz of quizzes) {
//     console.log(quizz.children);
//     quizz.addEventListener("click", (e) => {
//       console.log("click");
//       quizz.children[0].classList.toggle("d-none");
//       quizz.children[1].classList.toggle("d-block");
//     });
//   }
// }

function clearInputsData() {
  answerField.value = "";
  questionField.value = "";
}

function clearQuizzElements() {
  flashContainerEl.innerHTML = ``;
}
