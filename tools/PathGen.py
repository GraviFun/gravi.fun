# Gravifun Path Creator — Extended Edition
# Creates AI navigation paths from a vertex chain in Blender
# Builds a chain of Empty nodes linked as a path (with metadata)

import bpy

# Validate selection
if not bpy.context.selected_objects:
    raise Exception("Please select a mesh object with a vertex path.")
    
obj = bpy.context.selected_objects[0]
if obj.type != 'MESH':
    raise Exception("Selected object must be a mesh.")

mesh = obj.data

# Create path parent Empty
parent = bpy.data.objects.new(obj.name + '_path', None)
parent.empty_display_size = 1
parent.empty_display_type = 'PLAIN_AXES'
parent.location = obj.location
bpy.context.collection.objects.link(parent)

# Build vertex neighbor list
vertNeighbors = {}
for edge in mesh.edges:
    v1, v2 = edge.vertices
    vertNeighbors.setdefault(str(v1), []).append(v2)
    vertNeighbors.setdefault(str(v2), []).append(v1)

def getNodeName(index):
    return obj.name + '_node' + str(index)

# Track visited nodes
finished = []

def generateNode(index, previousIndex):
    v = mesh.vertices[int(index)]
    pos = v.co

    empty = bpy.data.objects.new(getNodeName(v.index), None)
    empty.empty_display_size = 1
    empty.empty_display_type = 'SPHERE'
    empty.location = pos
    empty.parent = parent

    neighbors = vertNeighbors[str(index)]

    # Assign custom properties
    empty['data'] = 'pathNode'
    empty['path'] = obj.name
    empty['previousNode'] = getNodeName(previousIndex) if previousIndex is not None else ''
    
    # Find next neighbor
    nextIndex = None
    for n in neighbors:
        if n != previousIndex:
            nextIndex = n
            break

    if nextIndex is not None:
        empty['nextNode'] = getNodeName(nextIndex)
    else:
        empty['nextNode'] = ''

    finished.append(index)

    # Visual: mark head and tail
    if previousIndex is None:
        empty.name = getNodeName(v.index) + '_HEAD'
    elif nextIndex is None:
        empty.name = getNodeName(v.index) + '_TAIL'

    if nextIndex is not None and nextIndex not in finished:
        generateNode(nextIndex, index)

# Automatically find a start point
startIndex = None
for key, neighbors in vertNeighbors.items():
    if len(neighbors) == 1:
        startIndex = int(key)
        break

if startIndex is None:
    raise Exception("Couldn't find a start point. Make sure the vertex chain is not a loop.")

# Start generating path
generateNode(startIndex, None)

print(f"Path nodes created for: {obj.name}")
