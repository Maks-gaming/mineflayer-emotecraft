import State from "./State";

export default class StateCollection {
	public x: State;
	public y: State;
	public z: State;
	public pitch: State;
	public yaw: State;
	public roll: State;
	public bend: State | undefined;
	public bendDirection: State | undefined;
	public isBendable: boolean;

	constructor(
		x: number,
		y: number,
		z: number,
		pitch: number,
		yaw: number,
		roll: number,
		translationThreshold: number,
		bendable: boolean,
	) {
		this.x = new State("x", x, translationThreshold, false);
		this.y = new State("y", y, translationThreshold, false);
		this.z = new State("z", z, translationThreshold, false);
		this.pitch = new State("pitch", pitch, 0, true);
		this.yaw = new State("yaw", yaw, 0, true);
		this.roll = new State("roll", roll, 0, true);
		if (bendable) {
			this.bendDirection = new State("axis", 0, 0, true);
			this.bend = new State("bend", 0, 0, true);
		} else {
			this.bend = undefined;
			this.bendDirection = undefined; //This will cause some errors, but fixes the invalid data problem
		}
		this.isBendable = bendable;
	}

	public verifyAndLock(maxLength: number): void {
		this.x.lockAndVerify(maxLength);
		this.y.lockAndVerify(maxLength);
		this.z.lockAndVerify(maxLength);
		this.pitch.lockAndVerify(maxLength);
		this.yaw.lockAndVerify(maxLength);
		this.roll.lockAndVerify(maxLength);

		if (this.bend !== undefined) this.bend.lockAndVerify(maxLength);
		if (this.bendDirection !== undefined)
			this.bendDirection.lockAndVerify(maxLength);
	}

	public copy() {
		return Object.create(this);
	}
}
