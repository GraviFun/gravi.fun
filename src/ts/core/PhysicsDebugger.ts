import * as THREE from 'three';

export class PhysicsDebugger {
  static drawForceArrow(object: THREE.Object3D, force: THREE.Vector3, color = 0xff0000) {
    const arrowHelper = new THREE.ArrowHelper(
      force.clone().normalize(),
      object.position,
      force.length() * 0.1,
      color
    );
    object.add(arrowHelper);
  }

  static highlightCollisions(object: THREE.Object3D) {
    object.traverse((child: any) => {
      if (child.isMesh) {
        child.material.emissive = new THREE.Color(0xff8800);
      }
    });
  }
}
