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
const remindersInDB = ref(database, "bryanReminder");

const addBtnEl = document.getElementById("add-btn");
const inputFieldEl = document.getElementById("input-field");
const reminderListEl = document.getElementById("reminder-tasks");
const dateTimeEl = document.getElementById("datetime-field");

addBtnEl.addEventListener("click", () => {
  const dateTimeValue = dateTimeEl.value;
  const inputValue = inputFieldEl.value;

  push(remindersInDB, [dateTimeValue, inputValue]);
  clearInputFieldEl();
  console.log("added to database");
});

onValue(remindersInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArr = Object.entries(snapshot.val());
    clearReminderListEl();
    console.log(itemsArr);
    itemsArr.forEach((item) => {
      appendReminderLists(item);
    });
  } else {
    reminderListEl.innerHTML = "<p>No tasks...yet. You are free 🤩</p>";
  }
});

function appendReminderLists(item) {
  const itemID = item[0];
  const reminderArr = item[1];
  const [dateTimeValue, inputValue] = reminderArr;
  const dueDateAndTime = new Date(dateTimeValue);
  console.log(inputFieldEl.value);
  const dueDate = dueDateAndTime.toDateString();
  const dueTime = dueDateAndTime.toLocaleTimeString();
  const newList = document.createElement("li");
  newList.innerHTML = `${inputValue} 🕰️ <span>${dueDate} at ${dueTime}</span> 👨🏻‍💻`;
  reminderListEl.appendChild(newList);
  newList.addEventListener("click", () => {
    let exactLocationOfItemInDB = ref(database, `bryanReminder/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearReminderListEl() {
  reminderListEl.innerHTML = "";
}
