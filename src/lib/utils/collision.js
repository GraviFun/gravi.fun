// Basic 2D AABB collision detection and resolution logic for GraviFun

export class Entity {
  constructor(name, x, y, width, height) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y + this.height,
      bottom: this.y
    };
  }

  move(dt) {
    this.x += this.velocityX * dt;
    this.y += this.velocityY * dt;
  }

  toString() {
    return `${this.name} at (${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
}

export function isColliding(a, b) {
  const A = a.getBounds();
  const B = b.getBounds();
  return (
    A.left < B.right &&
    A.right > B.left &&
    A.bottom < B.top &&
    A.top > B.bottom
  );
}

export function resolveCollision(a, b) {
  if (!isColliding(a, b)) return;

  // Simple vertical correction
  const overlapY = (b.y + b.height) - a.y;
  if (overlapY > 0) {
    a.y += overlapY;
    a.velocityY = 0;
  }
}

// Example demo
if (typeof window === 'undefined') {
  const player = new Entity("Player", 0, 10, 1, 2);
  const ground = new Entity("Ground", 0, 0, 10, 1);

  player.velocityY = -5;

  for (let i = 0; i < 20; i++) {
    player.move(0.1);
    resolveCollision(player, ground);
    console.log(player.toString());
  }
}
