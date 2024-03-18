import KeyFrame from "./KeyFrame";

export default class State {
	private isModifiable = true;
	public defaultValue: number;
	public threshold: number;
	keyFrames: KeyFrame[] = [];
	public name: string;
	private isAngle: boolean;
	isEnabled = false;

	/**
	 * @param name         Name (for import stuff)
	 * @param defaultValue default value
	 * @param threshold    threshold for validation
	 * @param isAngle      isAngle value (if false then it's a translation)
	 */
	constructor(
		name: string,
		defaultValue: number,
		threshold: number,
		isAngle: boolean,
	) {
		this.defaultValue = defaultValue;
		this.threshold = threshold;
		this.name = name;
		this.isAngle = isAngle;
	}

	/**
	 * Locks the object, throws exception if contains invalid data
	 * @param maxLength length of animation
	 */
	public lockAndVerify(maxLength: number) {
		this.keyFrames.forEach((keyFrame) => {
			if (
				keyFrame == undefined ||
				keyFrame.tick < 0 ||
				keyFrame.ease == undefined ||
				!isFinite(keyFrame.value)
			)
				throw new Error("Animation is invalid: " + keyFrame);
		});

		this.lock();
	}

	public setEnabled(newValue: boolean) {
		if (this.isModifiable) {
			this.isEnabled = newValue;
		} else {
			throw new Error("Can not modify locked things");
		}
	}

	optimize(isLooped: boolean, returnToTick: number) {
		for (let i = 1; i < this.keyFrames.length - 1; i++) {
			if (this.keyFrames[i - 1].value != this.keyFrames[i].value) {
				continue;
			}
			if (
				this.keyFrames.length <= i + 1 ||
				this.keyFrames[i].value != this.keyFrames[i + 1].value
			) {
				continue;
			}
			if (
				isLooped &&
				this.keyFrames[i - 1].tick < returnToTick &&
				this.keyFrames[i].tick >= returnToTick
			) {
				continue;
			}
			delete this.keyFrames[i--];
		}
	}

	private lock() {
		this.isModifiable = false;
		//this.keyFrames = Collections.unmodifiableList(keyFrames);
	}
}
