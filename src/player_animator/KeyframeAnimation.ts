import assert from "assert";
import AnimationFormat from "./AnimationFormat";
import StateCollection from "./StateCollection";

export default class KeyframeAnimation {
	public readonly beginTick;
	public readonly endTick;
	public readonly stopTick;
	public readonly isInfinite;
	//if infinite, where to return
	public readonly returnToTick;

	readonly bodyParts: { [id: string]: StateCollection } = {};

	//Deprecated variables will be removed in the animation rework part.
	public readonly isEasingBefore;
	public readonly nsfw;

	//Emote identifier code.
	private readonly uuid;
	/**
	 * Is the uuid generated when loading or was loaded from a file
	 */
	public readonly isUUIDGenerated;

	/**
	 * <b>Mutable</b> extra members for extra information store
	 */
	public readonly extraData: { [id: string]: Object } = {};

	/**
	 * Where is the animation from, not used in equals or hash.
	 */
	public readonly animationFormat;

	/**
	 * Will return invalid information if {@link KeyframeAnimation#isInfinite} is true
	 *
	 * @return The length of the emote in ticks (20 t/s)
	 */
	public getLength() {
		return this.stopTick;
	}

	public getUuid() {
		return this.uuid;
	}

	constructor(
		beginTick: number,
		endTick: number,
		stopTick: number,
		isInfinite: boolean,
		returnToTick: number,
		bodyParts: { [key: string]: StateCollection },
		isEasingBefore: boolean,
		nsfw: boolean,
		uuid: UUID,
		emoteFormat: AnimationFormat,
		extraData: { [id: string]: Object },
	) {
		this.beginTick = Math.max(beginTick, 0);
		this.endTick = Math.max(beginTick + 1, endTick);
		this.stopTick = stopTick <= endTick ? endTick + 3 : stopTick;
		this.isInfinite = isInfinite;
		if (isInfinite && (returnToTick < 0 || returnToTick > endTick))
			throw new Error("Trying to construct invalid animation");
		this.returnToTick = returnToTick;

		const bodyMap: Map<string, StateCollection> = new Map<
			string,
			StateCollection
		>();
		Object.entries(bodyParts).forEach(([key, value]) => {
			bodyMap.set(key, bodyParts[key].copy());
		});
		bodyMap.forEach((stateCollection, key) => {
			stateCollection.verifyAndLock(this.getLength());
		});
		this.bodyParts = Object.fromEntries(bodyMap);

		this.isEasingBefore = isEasingBefore;
		this.nsfw = nsfw;
		if (uuid == undefined) {
			this.isUUIDGenerated = true;
			uuid = this.generateUuid();
		} else {
			this.isUUIDGenerated = false;
		}
		this.uuid = uuid;
		this.animationFormat = emoteFormat;
		assert(emoteFormat != undefined);

		Object.entries(extraData).forEach(([key, value]) => {
			this.extraData[key] = value;
		});
	}

	private generateHashCode(obj: any): number {
		let hash = 0;

		Object.entries(obj).forEach(([key, value]) => {
			hash =
				(hash << 5) +
				hash +
				this.hashString(key) +
				this.hashString(JSON.stringify(value));
		});
		return hash;
	}

	private hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0; // Convert to 32-bit integer
		}
		return hash;
	}

	private generateUuid(): UUID {
		let result: number = this.beginTick;
		result = 31 * result + this.endTick;
		result = 31 * result + this.stopTick;
		result = 31 * result + (this.isInfinite ? 1 : 0);
		result = 31 * result + this.returnToTick;
		result = 31 * result + (this.isEasingBefore ? 1 : 0);

		const dataHash: bigint =
			BigInt(result) * 31n +
			BigInt(this.generateHashCode(this.bodyParts));

		const nameHash: bigint = BigInt(this.generateHashCode(this.extraData));
		let descHash: bigint = 0n;
		const authHash: bigint =
			BigInt(result) * 31n +
			BigInt(this.generateHashCode(this.extraData));
		//const iconHash: bigint = this.iconData == undefined ? 0n : BigInt(iconData.hashCode()) + authHash * 31n;

		return {
			leastSignificantBits: (descHash << 32n) + authHash,
			mostSignificantBits: (dataHash << 32n) + nameHash,
		};
	}

	public getPart(partID: string) {
		return this.bodyParts[partID];
	}
}
