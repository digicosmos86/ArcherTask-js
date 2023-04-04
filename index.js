import jsPsych from "./init";
import jsPsychInstructions from "@jspsych/plugin-instructions";
import jsPsychKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import { wave } from "./wave";

const pages = [
  "<p>Welcome!</p><p>Thank you for voluteering for this experiment.</p>",
  "<p>You are going to play a computer game. Then next screens will show you instructions for what you have to do.</p>"
];

const instruction = {
  type: jsPsychInstructions,
  pages,
  show_clickable_nav: true
};

const game = wave(100, 2, 200, "response", false, 0);

const outro = {
  type: jsPsychKeyboardResponse,
  stimulus: "Thank you for participating in this experiment!"
};

jsPsych.run([instruction, game, outro]);
