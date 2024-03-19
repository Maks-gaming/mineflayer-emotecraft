import ByteBuffer from "../ByteBuffer";
import KeyframeAnimation from "./KeyframeAnimation";
import State from "./State";
import StateCollection from "./StateCollection";

const keyframeSize = Buffer.alloc(0);
keyframeSize.writeUInt8(9);

export default class AnimationBinary {
	public static write(
		animation: KeyframeAnimation,
		buf: ByteBuffer,
		version: number,
	) {
		buf.putInt(animation.beginTick);
		buf.putInt(animation.endTick);
		buf.putInt(animation.stopTick);
		buf.putBoolean(animation.isInfinite);
		buf.putInt(animation.returnToTick);
		buf.putBoolean(animation.isEasingBefore);
		buf.putBoolean(animation.nsfw);
		buf.put(keyframeSize);

		if (version >= 2) {
			buf.putInt(Object.keys(animation.bodyParts).length);
			for (let key in animation.bodyParts) {
				const value = animation.bodyParts[key];
				buf.putString(key);
				this.writePart(buf, value, version);
			}
		} else {
			this.writePart(buf, animation.getPart("head"), version);
			this.writePart(buf, animation.getPart("body"), version);
			this.writePart(buf, animation.getPart("rightArm"), version);
			this.writePart(buf, animation.getPart("leftArm"), version);
			this.writePart(buf, animation.getPart("rightLeg"), version);
			this.writePart(buf, animation.getPart("leftLeg"), version);
		}
		buf.putLong(animation.getUuid().mostSignificantBits);
		buf.putLong(animation.getUuid().leastSignificantBits);

		return buf;
	}

	private static writePart(
		buf: ByteBuffer,
		part: StateCollection,
		version: number,
	) {
		this.writeKeyframes(buf, part.x, version);
		this.writeKeyframes(buf, part.y, version);
		this.writeKeyframes(buf, part.z, version);
		this.writeKeyframes(buf, part.pitch, version);
		this.writeKeyframes(buf, part.yaw, version);
		this.writeKeyframes(buf, part.roll, version);

		if (part.isBendable) {
			this.writeKeyframes(buf, part.bendDirection!, version);
			this.writeKeyframes(buf, part.bend!, version);
		}
	}

	private static writeKeyframes(
		buf: ByteBuffer,
		part: State,
		version: number,
	) {
		const list = part.keyFrames;

		if (version >= 2) {
			buf.putBoolean(part.isEnabled);
			buf.putInt(list.length);
		} else {
			buf.putInt(part.isEnabled ? list.length : -1);
		}

		if (part.isEnabled || version >= 2) {
			list.forEach((move) => {
				buf.putInt(move.tick);
				buf.putFloat(move.value);

				const ease = Buffer.alloc(1);
				ease.writeUint8(move.ease.getId(), 0);
				buf.put(ease);
			});
		}
	}
}
