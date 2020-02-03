const SCALE = 0.001; // scale of noisefield
var moveNoise = false; // is movement in noise space on
var particleCount = 1000; // max number of particles
const PARTICLE_VISIBILITY = 80; // alpha value of particles
const DELETION_SPEED = 10; // alpha value of black background drawn every frame, between 0-255, lower means slower deletion
const MAX_VEL = 6; // maxspeed of particles, independent of framerate (so higher framerate will make them go faster)
const hueMultiplier = 500.0; // particles will multiply noise result by this to get hue
const accMultiplier = 8 * Math.PI;
var particles = []; // array for particles
var z = 0;
const FIELD_TRANSFORM_RATE = 0.0; // rate at which field changes (z)

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
  if (particles.length < particleCount) {
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
