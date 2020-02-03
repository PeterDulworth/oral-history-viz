const SCALE = 0.001; // scale of noisefield
const PARTICLE_COUNT = 1000; // max number of particles
const DELETION_SPEED = 10; // alpha value of black background drawn every frame, between 0-255, lower means slower deletion
let particles = []; // array for particles
let z = 0;
const FIELD_TRANSFORM_RATE = 0.0; // rate at which field changes (z)

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");

  colorMode(HSB, 255);

  question1 = createP("enter your name...");
  question1.parent("question1");

  input1 = createInput();
  input1.parent("input1");

  // button = createButton("submit");
  // button.parent("button");
  // button.mousePressed(handleSubmit);

  noLoop();
}

function toggleDiv(id) {
  var div = document.getElementById(id);
  div.style.display = div.style.display == "none" ? "flex" : "none";
}

function toggleDivVis(id) {
  var div = document.getElementById(id);
  const vis = div.style.visibility;
  if (!vis || vis === "hidden") div.style.visibility = "visible";
  else div.style.visibility = "hidden";
}

window.onload = function() {
  document.getElementById("submit").onclick = handleSubmit;
  document.getElementById("ResetButton").onclick = handleReset;
  document.getElementById("FullScreenButton").onclick = handleFullScreen;
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
  noLoop();
  background(0, 0, 0);
  toggleDiv("Form");
  toggleDivVis("ResetButton");
}

function handleSubmit() {
  noiseSeed(input1.value().hashCode());
  background(0, 0, 0);
  loop();
  toggleDiv("Form");
  toggleDivVis("ResetButton");
  // question.html("hello");
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

// function keyPressed() {
//   switch (keyCode) {
//     case 70: // F
//       if (!fullscreen()) {
//         fullscreen(true);
//       }
//       break;
//   }
// }
