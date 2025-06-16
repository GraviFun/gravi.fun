import bpy
import random
import mathutils

# === GraviFun Physics Test Tool ===
# This script populates the scene with cubes, sets rigid body physics,
# and allows basic experimentation with collisions and gravity.

def create_ground():
    bpy.ops.mesh.primitive_plane_add(size=50, location=(0, 0, -0.5))
    ground = bpy.context.active_object
    ground.name = "GF_Ground"
    bpy.ops.rigidbody.object_add()
    ground.rigid_body.type = 'PASSIVE'
    ground.rigid_body.friction = 1.0
    print("Ground created.")

def create_box(name, location):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name

    bpy.ops.rigidbody.object_add()
    obj.rigid_body.type = 'ACTIVE'
    obj.rigid_body.mass = random.uniform(0.5, 3.0)
    obj.rigid_body.friction = 0.6
    obj.rigid_body.restitution = 0.2
    print(f"{name} created at {location}")

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    print("Scene cleared.")

def spawn_grid(rows=3, cols=3, spacing=2):
    for i in range(rows):
        for j in range(cols):
            x = i * spacing
            y = j * spacing
            z = 5 + random.random() * 2
            create_box(f"GF_Box_{i}_{j}", (x, y, z))

def apply_random_force(obj_name, strength=20):
    obj = bpy.data.objects.get(obj_name)
    if obj and obj.rigid_body:
        force = mathutils.Vector((
            random.uniform(-1, 1) * strength,
            random.uniform(-1, 1) * strength,
            random.uniform(1, 2) * strength
        ))
        obj.rigid_body.linear_velocity = force
        print(f"Applied force {force} to {obj_name}")

# === Run demo ===
clear_scene()
create_ground()
spawn_grid(4, 4)

for obj in bpy.data.objects:
    if obj.name.startswith("GF_Box_"):
        apply_random_force(obj.name)
