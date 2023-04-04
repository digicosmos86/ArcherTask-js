import jsPsych from "./init";
import htmlSliderResponse from "./archer";
import settings from "./settings";
import { normalRandomScaled } from "./random";
import { calculateByValue, isHit } from "./utils";
import { animationReset, hit, miss, reset } from "./animations";

const arrows = () => {
  let arrows = settings.maxArrows;

  return [() => arrows, () => (arrows -= 1)];
};

const [getArrows, decrementArrows] = arrows();

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

const getArcher = () =>
  document.getElementById("jspsych-html-slider-response-response");

const run = () => {
  jsPsych.endCurrentTimeline();
  jsPsych.finishTrial();
};

const response = (mean, sd, max, type, isOverlord, waveNumber) => {
  const responseOnLoad = () => {
    document.getElementById("run-button").addEventListener("click", run);

    let archer = getArcher();
    archer.disabled = false;
    window.addEventListener("keypress", pressSpace);

    let arrowsLeft = getArrows();

    let status = document.getElementById("status");
    status.innerHTML = `ArrowsLeft: ${arrowsLeft}/${settings.maxArrows}`;
  };

  const responseOnFinish = (data) => {
    data.targetValue = normalRandomScaled(data.mean, data.sd);
    data.hit = isHit(data.response, data.targetValue, isOverlord);
    data.miss = !data.hit;

    console.log(data);

    animationReset(data);
  };

  return {
    type: htmlSliderResponse,
    stimulus: stimulus,
    max,
    slider_start: Math.round(max / 2),
    data: {
      mean,
      sd,
      type,
      arrowsLeft: getArrows(),
      maxArrows: settings.maxArrows,
      waveNumber
    },
    on_finish: responseOnFinish,
    on_load: responseOnLoad
  };
};

const feedback = (mean, sd, max, isOverlord, waveNumber) => {
  const feedbackOnLoad = () => {
    window.removeEventListener("keypress", pressSpace);
    document.getElementById("run-button").addEventListener("click", run);
    setTimeout(() => jsPsych.finishTrial(), 1500);

    let archer = getArcher();
    archer.disabled = true;
    const archerValue = jsPsych.data.getLastTrialData().trials[0].response;
    archer.value = "" + archerValue;

    const wasHit = jsPsych.data.getLastTrialData().trials[0].hit;

    wasHit ? hit(isOverlord) : miss(isOverlord);
  };

  const feedbackOnFinish = (data) => {
    const lastTrialData = jsPsych.data.getLastTrialData().trials[0];

    data.hit = lastTrialData.hit;
    data.miss = !data.hit;

    animationReset(data);
  };

  return {
    type: htmlSliderResponse,
    stimulus: stimulus,
    max,
    data: {
      mean,
      sd,
      type: "feedback",
      arrowsLeft: () => {
        decrementArrows();
        return getArrows();
      },
      maxArrows: settings.maxArrows,
      waveNumber
    },
    on_finish: feedbackOnFinish,
    on_load: feedbackOnLoad
  };
};

const wave = (mean, sd, max, type, isOverlord, waveNumber) => {
  return {
    timeline: [
      response(mean, sd, max, type, isOverlord, waveNumber),
      feedback(mean, sd, max, isOverlord, waveNumber)
    ],
    repetitions: 5
  };
};

export { wave };
