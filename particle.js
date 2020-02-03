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
    this.setHue(force * hueMultiplier);
    var vector = p5.Vector.fromAngle(force * accMultiplier);
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
