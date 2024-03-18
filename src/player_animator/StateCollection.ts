import State from "./State";

export default class StateCollection {
	public x: State = undefined!;
	public y: State = undefined!;
	public z: State = undefined!;
	public pitch: State = undefined!;
	public yaw: State = undefined!;
	public roll: State = undefined!;
	public bend: State | undefined;
	public bendDirection: State | undefined;
	public isBendable: boolean = undefined!;

	create1(
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

		return this;
	}

	create2(threshold: number) {
		this.create1(0, 0, 0, 0, 0, 0, threshold, true);

		return this;
	}

	public fullyEnablePart(always: boolean) {
		if (
			always ||
			this.x.isEnabled ||
			this.y.isEnabled ||
			this.z.isEnabled ||
			this.pitch.isEnabled ||
			this.yaw.isEnabled ||
			this.roll.isEnabled ||
			(this.isBendable &&
				(this.bend!.isEnabled || this.bendDirection!.isEnabled))
		) {
			this.setEnabled(true);
		}
	}

	optimize(isLooped: boolean, ret: number) {
		this.x.optimize(isLooped, ret);
		this.y.optimize(isLooped, ret);
		this.z.optimize(isLooped, ret);
		this.pitch.optimize(isLooped, ret);
		this.yaw.optimize(isLooped, ret);
		this.roll.optimize(isLooped, ret);
		if (this.isBendable) {
			this.bend!.optimize(isLooped, ret);
			this.bendDirection!.optimize(isLooped, ret);
		}
	}

	public setEnabled(enabled: boolean) {
		this.x.setEnabled(enabled);
		this.y.setEnabled(enabled);
		this.z.setEnabled(enabled);
		this.pitch.setEnabled(enabled);
		this.yaw.setEnabled(enabled);
		this.roll.setEnabled(enabled);
		if (this.isBendable) {
			this.bend!.setEnabled(enabled);
			this.bendDirection!.setEnabled(enabled);
		}
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
