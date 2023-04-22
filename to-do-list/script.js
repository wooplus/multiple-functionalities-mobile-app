import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://mobileshoppingapp-58bfd-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const todoThingsInDB = ref(database, "bryanLists");

const inputFieldEl = document.getElementById("input-field");
const todoEl = document.getElementById("to-do-things");
const addButtonEl = document.getElementById("add-btn");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(todoThingsInDB, inputValue);
  clearInputFieldEl();
  console.log("added to database");
});

onValue(todoThingsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    console.log(itemsArray);

    clearTodoEl();
    itemsArray.forEach((item) => {
      appendTodoThingsEl(item);
    });
  } else {
    todoEl.innerHTML = "No items ... yet";
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearTodoEl() {
  todoEl.innerHTML = "";
}

function appendTodoThingsEl(item) {
  const [itemID, itemValue] = item;
  const newEl = document.createElement("li");
  newEl.classList.add("to-do-item");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `bryanLists/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  todoEl.appendChild(newEl);
}
