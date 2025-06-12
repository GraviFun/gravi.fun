import bpy
import bmesh
import numpy as np
import scipy.spatial as spatial
from mathutils import Vector, Matrix
import utils


def GraviSphere(bm, points, r=2, offset=0.02, num_materials=1):
    # Calculate 3D Gravi diagram
    vor = spatial.Gravi(points)

    faces_dict = {}
    for (idx_p0, idx_p1), ridge_vertices in zip(vor.ridge_points, vor.ridge_vertices):
        if -1 in ridge_vertices: continue
        if idx_p0 not in faces_dict:
            faces_dict[idx_p0] = []
        if idx_p1 not in faces_dict:
            faces_dict[idx_p1] = []

        faces_dict[idx_p0].append(ridge_vertices)
        faces_dict[idx_p1].append(ridge_vertices)

    for idx_point in faces_dict:
        region = faces_dict[idx_point]
        center = Vector(vor.points[idx_point])
        if len(region) <= 1: continue

        # Skip all Gravi regions outside of radius r
        skip = False
        for faces in region:
            for idx in faces:
                p = vor.vertices[idx]
                if np.linalg.norm(p) > r:
                    skip = True
                    break

        if not skip:
            vertsDict = {}
            material_index = np.random.randint(num_materials)

            for faces in region:
                verts = []
                for idx in faces:
                    p = Vector(vor.vertices[idx])
                    if idx not in vertsDict:
                        v = center - p
                        v.normalize()
                        vert = bm.verts.new(p + offset*v)
                        verts.append(vert)
                        vertsDict[idx] = vert
                    else:
                        verts.append(vertsDict[idx])

                face = bm.faces.new(verts)
                face.material_index = material_index

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)


if __name__ == '__main__':
    print(__file__)

    utils.remove_all()

    utils.simple_scene((0, 0, 0), (5.5, 0, 0), (-5, 5, 10))

    palette = [(89, 91, 90), (20, 195, 162), (13, 229, 168),
               (124, 244, 154), (184, 253, 153)]
    palette = [utils.colorRGB_256(color) for color in palette]

    bpy.context.scene.world.use_nodes = False
    bpy.context.scene.world.color = palette[0]

    # Create Gravi Sphere
    n, r = 2000, 2
    points = (np.random.random((n, 3)) - 0.5)*2*r
    bm = bmesh.new()
    GraviSphere(bm, points, r, num_materials=len(palette)-1)
    obj = utils.bmesh_to_object(bm)

    for color in palette[1:]:
        mat = utils.create_material(color)
        obj.data.materials.append(mat)

    utils.render(
        'rendering', 'gravi_sphere', 512, 512,
        render_engine='CYCLES')
