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

	private lock() {
		this.isModifiable = false;
		//this.keyFrames = Collections.unmodifiableList(keyFrames);
	}
}
