const PARTICLE_VISIBILITY = 80; // alpha value of particles
const MAX_VEL = 6; // maxspeed of particles, independent of framerate (so higher framerate will make them go faster)
const HUE_MULTIPLIER = 500.0; // particles will multiply noise result by this to get hue
const ACC_MULTIPLIER = 8 * Math.PI;

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.hue = 0;
    this.prevPos = this.pos.copy();
  }

  update = function() {
    this.vel.add(this.acc);
    this.vel.limit(MAX_VEL);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  applyForce = function(force) {
    this.acc.add(force);
  };

  calculateForce = function() {
    var force = calculateForce(this.pos.x, this.pos.y);
    this.setHue(force * HUE_MULTIPLIER);
    var vector = p5.Vector.fromAngle(force * ACC_MULTIPLIER);
    this.acc.add(vector);
  };

  setHue = function(force) {
    if (force > 255) this.hue = force % 256;
    else this.hue = force;
    stroke(this.hue, 255, 255, PARTICLE_VISIBILITY);
  };

  show = function() {
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  };

  updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  // if particle leaves screen, randomly reset it
  edges = function() {
    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    ) {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0, 0);
      this.updatePrev();
    }
  };
}
