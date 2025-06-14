// GraviFun Physics Module — Gravity & Motion
// Provides basic simulation of gravity and vertical motion for objects in the scene.

export class GraviObject {
  constructor(name, x, y, mass = 1.0) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.velocityY = 0;
    this.accelerationY = 0;
    this.isGrounded = false;
  }

  applyGravity(gravity = 9.81, deltaTime = 0.016) {
    if (!this.isGrounded) {
      this.accelerationY = gravity;
      this.velocityY += this.accelerationY * deltaTime;
      this.y -= this.velocityY * deltaTime;
    }
  }

  checkGround(groundY = 0) {
    if (this.y <= groundY) {
      this.y = groundY;
      this.velocityY = 0;
      this.accelerationY = 0;
      this.isGrounded = true;
    }
  }

  update(deltaTime = 0.016, gravity = 9.81) {
    this.applyGravity(gravity, deltaTime);
    this.checkGround(0);
  }

  toString() {
    return `${this.name}: y=${this.y.toFixed(2)}, vy=${this.velocityY.toFixed(2)}, grounded=${this.isGrounded}`;
  }
}

// Sample simulation loop
if (typeof window === 'undefined') {
  const box = new GraviObject("TestBox", 50);
  for (let i = 0; i < 60; i++) {
    box.update(0.016);
    console.log(box.toString());
  }
}
