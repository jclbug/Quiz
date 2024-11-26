"use strict";

const quizCard = document.querySelectorAll(".quizCard");
const tickSign = document.querySelectorAll(".tickSign");
const createQuizNextBtn = document.getElementById("createQuizNextBtn");
const blankPage = document.getElementById("blankPage");

let topicForAi = null;
let cardIndex = null;
const pageRedirect = [
  "quizBlank.html",
  "quizBlank.html",
  "quizBlank.html",
  "quizBlank.html",
];

// setting values of (number of questions) and (time btw question) to local storage
createQuizNextBtn.addEventListener("click", function () {
  localStorage.setItem("noOfQue", document.getElementById("noOfQue").value);
  localStorage.setItem("settingPage", "true");
  localStorage.setItem(
    "timeBtwQue",
    document.getElementById("timeBtwQue").value
  );
  localStorage.setItem(
    "oneQueTime",
    document.getElementById("oneQueTime").value
  );
  localStorage.setItem(
    "isShuffle",
    document.getElementById("shuffleInput").checked
  );
  localStorage.setItem("aiTopic", topicForAi);
});

// its highlight select card means add border and tick mark
quizCard.forEach((card, i) => {
  card.addEventListener("click", function () {
    //this deselect previous selected card
    quizCard.forEach((el, ind) => {
      if (ind != i) {
        el.classList.remove("active-card");
        tickSign[ind].classList.add("hide");
      }
    });
    card.classList.toggle("active-card");
    tickSign[i].classList.toggle("hide");

    // check whether that card is selected or not, if selected then it enable next button
    if (card.classList.contains("active-card")) {
      // if (i != 0) {
      topicForAi = card.getElementsByTagName("p")[0].innerText;
      console.log(topicForAi);
      // }

      createQuizNextBtn.classList.remove("hide");
      createQuizNextBtn.addEventListener("click", function () {
        window.location = "../pages/" + pageRedirect[i];
      });
    } else {
      createQuizNextBtn.classList.add("hide");
    }
  });
});

const inputInRange = function (start, end, el) {
  const val = Number.parseInt(el.value);
  if (val < start) {
    el.value = start;
    el.classList.add("error");
    el.addEventListener("focus", function () {
      el.classList.remove("error");
      el.removeEventListener("focus", function () {
        el.classList.remove("error");
      });
    });
  } else if (val > end) {
    el.value = end;
    el.classList.add("error");
    el.addEventListener("focus", function () {
      el.classList.remove("error");
      el.removeEventListener("focus", function () {
        el.classList.remove("error");
      });
    });
  }
};

// it check question number should be in between 4 to 50
// if not then it mark border as red
const noOfQue = document.getElementById("noOfQue");
noOfQue.addEventListener("focusout", function () {
  inputInRange(4, 50, noOfQue);
});

// it check time between two question should be 3 to 30
// if not then it mark border as red
const timeBtwQue = document.getElementById("timeBtwQue");
timeBtwQue.addEventListener("focusout", function () {
  inputInRange(3, 30, timeBtwQue);
});

// it check time for one question is within limit or not
// if not then it mark border as red
const oneQueTime = document.getElementById("oneQueTime");
oneQueTime.addEventListener("focusout", function () {
  inputInRange(10, 30, oneQueTime);
});

// const inputs = document.querySelectorAll(".queTimeInput");

// inputs.forEach((el) => {
//   el.addEventListener("keydown", function (e) {
//     if (!isNaN(e.target.value) && e.target.value.trim() !== "") {
//       e.target.value += e.target.value;
//     }
//   });
// });
