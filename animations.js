import jsPsych from "./init";
import { calculateByValue } from "./utils";

const animationReset = (data) => {
  const arrow = document.getElementById("arrow");
  const minion = document.getElementById("minion");
  const overlord = document.getElementById("overlord");

  const all = [arrow, minion, overlord];

  let archerValue;
  let targetValue;

  if (data.type === "feedback") {
    archerValue = jsPsych.data.getLastTrialData().trials[0].response;
    targetValue = jsPsych.data.getLastTrialData().trials[0].targetValue;
  } else {
    archerValue = data.response;
    targetValue = data.targetValue;
  }

  // Get the user selected archer value
  // and the generated targetValue

  all.forEach((e) => (e.style.visibility = "hidden"));
  all.forEach((e) => e.classList.remove("transit-one-sec"));
  all.forEach((e) => e.classList.remove("transit-half-sec"));

  arrow.style.top = calculateByValue(archerValue) + "px";
  arrow.style.left = "100px";

  minion.style.top = calculateByValue(targetValue) + "px";
  minion.style.left = "1000px";

  overlord.style.top = calculateByValue(targetValue) + "px";
  overlord.style.left = "1000px";
};

const miss = (isOverloard = false) => {
  const arrow = document.getElementById("arrow");
  const minion = document.getElementById("minion");
  const overlord = document.getElementById("overlord");
  const enemy = isOverloard ? overlord : minion;

  const both = [arrow, enemy];

  both.forEach((e) => (e.style.visibility = "visible"));
  both.forEach((e) => e.classList.add("transit-one-sec"));

  arrow.style.left = "1000px";
  minion.style.left = "100px";
};

const hit = (isOverloard = false) => {
  const arrow = document.getElementById("arrow");
  const minion = document.getElementById("minion");
  const overlord = document.getElementById("overlord");
  const enemy = isOverloard ? overlord : minion;

  const both = [arrow, enemy];

  both.forEach((e) => (e.style.visibility = "visible"));
  both.forEach((e) => e.classList.add("transit-half-sec"));

  setTimeout(() => {
    arrow.style.visibility = "hidden";
    enemy.firstChild.href = "./img/explosion.gif";

    setTimeout(() => {
      enemy.style.visibility = "hidden";
      enemy.firstChild.src = `./img/${isOverloard ? "Boss" : "minion"}.png`;
    }, 500);
  }, 500);

  arrow.style.left = "550px";
  minion.style.left = "550px";
};

export { hit, miss, animationReset };
