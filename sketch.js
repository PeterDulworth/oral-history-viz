// TODO: add enter -> submit
// TODO: start with more pixels?
// TODO: require name

const SCALE = 0.001; // scale of noisefield
const PARTICLE_COUNT = 1000; // max number of particles
const DELETION_SPEED = 50; // alpha value of black background drawn every frame, between 0-255, lower means slower deletion
let particles = []; // array for particles
let z = 0;
const FIELD_TRANSFORM_RATE = 0.0; // rate at which field changes (z)
let curQuestion = 0;

let question, option1, option2;
let name = "";
let answers = [];

const questions = [
  {
    prompt: "Would You Rather Be",
    option1: "A Hopeless Romantic",
    option2: "A Hopeful Unromantic"
  },
  {
    prompt: "Would You Rather",
    option1: "Create A Great Piece Of Art And Not Get Credit",
    option2: "Get Credit For A Piece Of Art You Didn't Create"
  },
  {
    prompt: "Would You Rather",
    option1: "See The World But Live In Poverty",
    option2: "Stay In One Place And Live Rich"
  },
  {
    prompt: "Would You Rather",
    option1: "Never Hear Music Again",
    option2: "Lose The Ability To Read"
  },
  {
    prompt: "Would You Rather",
    option1: "Create History",
    option2: "Delete History"
  },
  {
    prompt: "Would You Rather",
    option1: "Have Legs As Long As Your Fingers",
    option2: "Have Fingers As Long As Your Legs"
  }
];

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");
  colorMode(HSB, 255);
  noLoop();
}

const handleNext = option => {
  if (option === "name") {
    curQuestion = 0;
    name = document.getElementById("NameInput").value;
    hideDiv("NameQuestion");
    displayDiv("QuestionDiv");
    return;
  }

  answers.push(option);

  if (curQuestion < questions.length - 1) {
    // go to next question
    curQuestion++;
    loadQuestion(curQuestion);
  } else {
    // submit
    handleSubmit();
  }
};

window.onload = function() {
  // setup onclicks
  document.getElementById("SubmitNameButton").onclick = () =>
    handleNext("name");
  document.getElementById("Option1").onclick = () => handleNext("first");
  document.getElementById("Option2").onclick = () => handleNext("second");
  document.getElementById("ResetButton").onclick = handleReset;
  document.getElementById("FullScreenButton").onclick = handleFullScreen;
  document
    .getElementById("NameInput")
    .addEventListener(
      "keydown",
      e => (e.keyCode == 13 ? handleNext("name") : ""),
      false
    );

  question = document.getElementById("Question");
  option1 = document.getElementById("Option1");
  option2 = document.getElementById("Option2");

  // load the first question
  loadQuestion(0);
};

const loadQuestion = i => {
  question.innerText = questions[i].prompt;
  option1.innerText = questions[i].option1;
  option2.innerText = questions[i].option2;
};

function handleFullScreen() {
  if (!fullscreen()) {
    fullscreen(true);
  } else {
    fullscreen(false);
  }
}

function handleReset() {
  particles = [];
  curQuestion = 0;
  name = "";
  answers = [];
  document.getElementById("NameInput").value = "";
  noLoop();
  background(0, 0, 0);
  hideDiv("QuestionDiv");
  displayDiv("NameQuestion");
  toggleDiv("Form", "flex");
  toggleDivVis("ResetButton");
}

function handleSubmit() {
  const answersToHash = answers.reduce((a, b) => a + b);
  console.log(name + answersToHash);
  noiseSeed((name + answersToHash).hashCode());
  background(0, 0, 0);
  loop();
  toggleDiv("Form");
  toggleDivVis("ResetButton");
}

function draw() {
  if (particles.length < PARTICLE_COUNT) {
    addParticles(1);
  }

  background(0, 0, 0, DELETION_SPEED);

  // loop through every particle
  for (var i = 0; i < particles.length; i++) {
    particles[i].calculateForce(); // calculate force from noise field
    // will also set hue
    particles[i].update(); // move particle
    particles[i].show(); // draw particle
    particles[i].edges(); // check if still in bounds
  }

  z += FIELD_TRANSFORM_RATE;
}

// calculate force from noisefield
function calculateForce(x, y) {
  return noise(x * SCALE, y * SCALE, z);
}

function addParticles(num) {
  for (var i = 0; i < num; i++) {
    particles.unshift(new Particle());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
