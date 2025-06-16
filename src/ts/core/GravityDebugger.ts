export class GravityDebugger {
    static logPosition(objectName: string, x: number, y: number, z: number): void {
        console.log(`[GraviFun][${objectName}] Position - X: ${x}, Y: ${y}, Z: ${z}`);
    }

    static warn(message: string): void {
        console.warn(`[GraviFun][Warning] ${message}`);
    }

    static error(message: string): void {
        console.error(`[GraviFun][Error] ${message}`);
    }

    static info(message: string): void {
        console.info(`[GraviFun][Info] ${message}`);
    }

    static logVelocity(objectName: string, vx: number, vy: number, vz: number): void {
        console.log(`[GraviFun][${objectName}] Velocity - VX: ${vx}, VY: ${vy}, VZ: ${vz}`);
    }

    static logRotation(objectName: string, rx: number, ry: number, rz: number): void {
        console.log(`[GraviFun][${objectName}] Rotation - RX: ${rx}, RY: ${ry}, RZ: ${rz}`);
    }

    static logCollision(objectA: string, objectB: string): void {
        console.log(`[GraviFun] Collision detected between ${objectA} and ${objectB}`);
    }

    static logStateChange(objectName: string, fromState: string, toState: string): void {
        console.log(`[GraviFun][${objectName}] State changed from ${fromState} to ${toState}`);
    }

    static trackLifecycle(objectName: string, status: string): void {
        console.log(`[GraviFun][${objectName}] Lifecycle status: ${status}`);
    }

    static logHierarchy(parent: string, child: string): void {
        console.log(`[GraviFun] ${child} is now a child of ${parent}`);
    }

    static logForce(objectName: string, fx: number, fy: number, fz: number): void {
        console.log(`[GraviFun][${objectName}] Force applied - FX: ${fx}, FY: ${fy}, FZ: ${fz}`);
    }

    static logScale(objectName: string, sx: number, sy: number, sz: number): void {
        console.log(`[GraviFun][${objectName}] Scale - SX: ${sx}, SY: ${sy}, SZ: ${sz}`);
    }

    static logCustom(key: string, value: any): void {
        console.log(`[GraviFun][Custom] ${key}: ${JSON.stringify(value)}`);
    }

    static separator(title: string): void {
        console.log(`\n========== ${title} ==========\n`);
    }
}
