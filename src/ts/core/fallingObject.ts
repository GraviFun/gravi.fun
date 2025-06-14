// fallingObject.ts

type Vector2 = {
  x: number;
  y: number;
};

interface SimulatedObject {
  name: string;
  position: Vector2;
  velocity: Vector2;
  mass: number;
  isGrounded: boolean;
}

class FallingObject implements SimulatedObject {
  name: string;
  position: Vector2;
  velocity: Vector2;
  mass: number;
  isGrounded: boolean;

  constructor(name: string, x: number, y: number, mass: number = 1.0) {
    this.name = name;
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.mass = mass;
    this.isGrounded = false;
  }

  applyGravity(gravity: number = 9.81, dt: number = 0.016) {
    if (!this.isGrounded) {
      this.velocity.y -= gravity * dt;
    }
  }

  update(dt: number = 0.016, groundY: number = 0) {
    this.applyGravity(9.81, dt);
    this.position.y += this.velocity.y * dt;

    if (this.position.y <= groundY) {
      this.position.y = groundY;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
  }

  status(): string {
    return `${this.name} at y=${this.position.y.toFixed(2)} | v=${this.velocity.y.toFixed(2)} | grounded=${this.isGrounded}`;
  }
}

// Example simulation
function simulateFall() {
  const box = new FallingObject("TestCrate", 0, 20);
  const frames = 60;
  const dt = 0.016;

  for (let i = 0; i < frames; i++) {
    box.update(dt);
    console.log(box.status());
  }
}

simulateFall();
