const answerField = document.getElementById("answer-field");
const questionField = document.getElementById("question-field");
import data from "./data.js";

render(data);

document.getElementById("add-quiz-btn").addEventListener("click", (e) => {
  e.preventDefault();
  data.push({
    question: answerField.value,
    answer: questionField.value,
  });
  render(data);
  console.log(answerField.value, questionField.value);
});

function render(data) {
  getQuizzElements(data);
  flipBackAction();
  clearInputsData();
}

function getQuizzElements(data) {
  let flashText = ``;
  for (let quizz of data) {
    flashText += `<div class="flashcard" id="flashcard">
        <div class="front" id="front">
          <h2>Question</h2>
          <p>${quizz.question}</p>
        </div>
        <div class="back" id="back">
          <h2>Answer</h2>
          <p>${quizz.answer}</p>
        </div>
      </div>`;
  }
  document.getElementById("flash-container").innerHTML = flashText;
}

function flipBackAction() {
  let quizzes = document.getElementsByClassName("flashcard");
  for (let quizz of quizzes) {
    console.log(quizz.children);
    quizz.addEventListener("click", (e) => {
      console.log("click");
      quizz.children[0].classList.toggle("d-none");
      quizz.children[1].classList.toggle("d-block");
    });
  }
}

function clearInputsData() {
  answerField.value = "";
  questionField.value = "";
}
