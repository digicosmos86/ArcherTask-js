import { initJsPsych } from "jspsych";

let settings = {
  experiment_width: 1000,
  display_element: "jspsych-main"
};

const jsPsych = initJsPsych(settings);

export default jsPsych;
