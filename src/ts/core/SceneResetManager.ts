export class SceneResetManager {
  private static originalStates = new Map<THREE.Object3D, { position: THREE.Vector3, rotation: THREE.Euler }>();

  static register(obj: THREE.Object3D) {
    this.originalStates.set(obj, {
      position: obj.position.clone(),
      rotation: obj.rotation.clone(),
    });
  }

  static resetAll() {
    this.originalStates.forEach((state, obj) => {
      obj.position.copy(state.position);
      obj.rotation.copy(state.rotation);
    });
  }

  static clear() {
    this.originalStates.clear();
  }
}
