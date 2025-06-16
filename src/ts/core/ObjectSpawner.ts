import * as THREE from 'three';

export interface SpawnConfig {
    position: THREE.Vector3;
    rotation?: THREE.Euler;
    scale?: THREE.Vector3;
    mass?: number;
    name?: string;
}

export class ObjectSpawner {
    private scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public spawnBox(config: SpawnConfig): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(
            config.scale?.x || 1,
            config.scale?.y || 1,
            config.scale?.z || 1
        );
        const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const box = new THREE.Mesh(geometry, material);

        box.position.copy(config.position);
        if (config.rotation) box.rotation.copy(config.rotation);
        box.name = config.name || `box_${Date.now()}`;

        this.scene.add(box);
        this.logSpawn(box.name, config);
        return box;
    }

    public spawnSphere(config: SpawnConfig): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(config.scale?.x || 1, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.copy(config.position);
        if (config.rotation) sphere.rotation.copy(config.rotation);
        sphere.name = config.name || `sphere_${Date.now()}`;

        this.scene.add(sphere);
        this.logSpawn(sphere.name, config);
        return sphere;
    }

    private logSpawn(name: string, config: SpawnConfig): void {
        console.log(`[Spawner] Spawned ${name} at ${config.position.toArray().join(', ')}`);
    }

    public clearScene(): void {
        this.scene.children = this.scene.children.filter(obj => {
            const keep = !obj.name.startsWith('box_') && !obj.name.startsWith('sphere_');
            if (!keep) console.log(`[Spawner] Removed ${obj.name}`);
            return keep;
        });
    }

    public spawnGrid(count: number, spacing: number = 2): void {
        for (let i = 0; i < count; i++) {
            const pos = new THREE.Vector3(i * spacing, 0, 0);
            this.spawnBox({ position: pos, scale: new THREE.Vector3(1, 1, 1) });
        }
    }
}
