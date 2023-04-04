import htmlSliderResponse from "./archer";
import { calculateByValue } from "./utils";

let stimulus = `
<div id="html-slider-response">
  <div id="top-bar">
    <div id="run-wrapper"><button type="button" id="run-button">RUN!</button></div>
    <div id="status"><div>
  </div>
</div>
`;

const pressSpace = (e) => {
  e.preventDefault();
  if (e.keyCode === 32) {
    let nextButton = document.getElementById(
      "jspsych-html-slider-response-next"
    );
    if (nextButton) nextButton.dispatchEvent(new MouseEvent("click"));
  }
};

const archerTask = (jsPsych) => {
  const getArcher = () =>
    document.getElementById("jspsych-html-slider-response-response");

  const run = () => {
    jsPsych.endCurrentTimeline();
    jsPsych.finishTrial();
  };

  const responseOnLoad = () => {
    document.getElementById("run-button").addEventListener("click", run);

    let archer = getArcher();
    archer.disabled = false;
    window.addEventListener("keypress", pressSpace);
  };

  const feedbackOnLoad = () => {
    window.removeEventListener("keypress", pressSpace);
    document.getElementById("run-button").addEventListener("click", run);
    setTimeout(() => jsPsych.finishTrial(), 1500);

    let archer = getArcher();
    archer.disabled = true;
    const archerValue = jsPsych.data.getLastTrialData().trials[0].response;
    archer.value = "" + archerValue;

    let arrow = document.getElementById("arrow");
    let minion = document.getElementById("minion");

    arrow.style.visibility = "visible";
    minion.style.visibility = "visible";

    arrow.classList.add("moveHoriz");
    minion.classList.add("moveHoriz");

    arrow.style.left = "1000px";
    minion.style.left = "100px";
  };

  return {};
};

export { archerTask };
