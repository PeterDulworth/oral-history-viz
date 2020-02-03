const scl = 0.001; // scale of noisefield
var moveNoise = false; // is movement in noise space on
var moveParticles = true; // is particle movement on
var particleCount = 1000; // max number of particles
var numberOfSlices = 5; // number of slices in noise space (along z-axis)
var visibility = 80; // alpha value of particles
var deletionSpeed = 10; // alpha value of black background drawn every frame, between 0-255, lower means slower deletion
const sclMultiplier = 1.2;

// movement per second
const xSpeed = 0.0008;
const ySpeed = 0.01;
const zSpeed = 0.05;

const sliceDistance = 0.005; // distance between noise slices
const maxspeed = 6; // maxspeed of particles, independent of framerate (so higher framerate will make them go faster)

const hueMultiplier = 500.0; // particles will multiply noise result by this to get hue
const accMultiplier = 8 * Math.PI;

// position in noise field
var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var particles = []; // array for particles
var timeLastFrame = 0.0; // record time ellapsed since last frame to move noise
// field with the same speed, independent of framerate

function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("p5canvas");

  noiseSeed(NOISE_SEED);

  timeLastFrame = millis();

  colorMode(HSB, 255);
  textSize(15);

  addParticles(300);
}

function draw() {
  if (moveParticles) {
    var timePassed = (millis() - timeLastFrame) / 1000.0;
    timeLastFrame = millis();

    // add/delete particle, if there are not enough/too many
    if (particles.length < particleCount) {
      addParticles(1);
    } else if (particles.length > particleCount) {
      deleteParticles(1);
    }

    if (moveNoise) {
      xMove += xSpeed * timePassed;
      yMove += ySpeed * timePassed;
      zMove += zSpeed * timePassed;
    }

    background(0, 0, 0, deletionSpeed);

    // loop through every particle
    for (var i = 0; i < particles.length; i++) {
      particles[i].calculateForce(); // calculate force from noise field
      // will also set hue
      particles[i].update(); // move particle
      particles[i].show(); // draw particle
      particles[i].edges(); // check if still in bounds
    }
  }
}

// calculate force from noisefield
function calculateForce(x, y, z) {
  return noise(x * scl + xMove, y * scl + yMove, z + zMove);
}

// add/delete/set particles
function addParticles(num) {
  for (var i = 0; i < num; i++) {
    particles.unshift(new Particle());
  }
}

function deleteParticles(num) {
  num = min(num, particles.length);
  for (var i = 0; i < num; i++) {
    particles.pop();
  }
}

function setParticles(num) {
  particleCount = num;
  var dif = particleCount - particles.length;
  if (dif > 0) {
    addParticles(dif);
  } else {
    deleteParticles(-dif);
  }
}

// some helpers
function resetCanvas() {
  deleteParticles(particles.length); // delete all particles
  setParticles(particleCount); // add new particles
  background(0); // draw over everything
  moveParticles = true; // start drawing
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
