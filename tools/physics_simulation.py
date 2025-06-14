# Simple gravity simulation for objects in GraviFun

class Object:
    def __init__(self, name, y_position, velocity=0.0):
        self.name = name
        self.y = y_position
        self.velocity = velocity

    def update(self, dt, gravity=9.81):
        self.velocity -= gravity * dt
        self.y += self.velocity * dt

    def __repr__(self):
        return f"{self.name}: y={self.y:.2f}, v={self.velocity:.2f}"


if __name__ == "__main__":
    obj = Object("Box", y_position=50.0)
    dt = 0.016  # 60 FPS step
    for _ in range(60):  # simulate 1 second
        obj.update(dt)
        print(obj)
