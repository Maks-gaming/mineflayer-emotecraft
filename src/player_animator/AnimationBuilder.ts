import AnimationFormat from "./AnimationFormat";
import KeyframeAnimation from "./KeyframeAnimation";
import StateCollection from "./StateCollection";

export default class AnimationBuilder {
	static staticThreshold = 8;

	head: StateCollection = undefined!;
	body: StateCollection = undefined!;
	rightArm: StateCollection = undefined!;
	leftArm: StateCollection = undefined!;
	rightLeg: StateCollection = undefined!;
	leftLeg: StateCollection = undefined!;
	leftItem: StateCollection = undefined!;
	rightItem: StateCollection = undefined!;
	torso: StateCollection = undefined!;
	isEasingBefore = false;
	validationThreshold = AnimationBuilder.staticThreshold;
	nsfw = false;
	private bodyParts: { [id: string]: StateCollection } = {};

	/**
	 * If you want auto-uuid, leave it null
	 */
	uuid: UUID | undefined;

	beginTick = 0;
	endTick: number = undefined!;
	stopTick = 0;
	isLooped = false;
	returnTick: number = undefined!;
	emoteEmoteFormat: AnimationFormat = undefined!;

	//private  float validationThreshold;

	name: string | undefined;

	//Common names used in Emotecraft
	//If not null, it will be added to extraData
	description: string | undefined;
	author: string | undefined;

	// @Nullable
	//  NBS song = null;

	// @Nullable
	//  ByteBuffer iconData;

	extraData: { [id: string]: Object } = {};

	create1(emoteFormat: AnimationFormat, validationThreshold?: number) {
		this.validationThreshold =
			validationThreshold ?? AnimationBuilder.staticThreshold;

		this.head = new StateCollection().create1(
			0,
			0,
			0,
			0,
			0,
			0,
			this.validationThreshold,
			false,
		);
		this.body = new StateCollection().create1(
			0,
			0,
			0,
			0,
			0,
			0,
			this.validationThreshold / 8.0,
			true,
		);
		this.rightArm = new StateCollection().create1(
			-5,
			2,
			0,
			0,
			0,
			0.0,
			this.validationThreshold,
			true,
		);
		this.leftArm = new StateCollection().create1(
			5,
			2,
			0,
			0,
			0,
			0.0,
			this.validationThreshold,
			true,
		);
		this.leftLeg = new StateCollection().create1(
			1.9,
			12,
			0.1,
			0,
			0,
			0,
			this.validationThreshold,
			true,
		);
		this.rightLeg = new StateCollection().create1(
			-1.9,
			12,
			0.1,
			0,
			0,
			0,
			this.validationThreshold,
			true,
		);
		this.leftItem = new StateCollection().create1(
			0,
			0,
			0,
			0,
			0,
			0,
			this.validationThreshold,
			false,
		);
		this.rightItem = new StateCollection().create1(
			0,
			0,
			0,
			0,
			0,
			0,
			this.validationThreshold,
			false,
		);
		this.torso = new StateCollection().create1(
			0,
			0,
			0,
			0,
			0,
			0,
			this.validationThreshold,
			true,
		);

		this.bodyParts["head"] = this.head;
		this.bodyParts["body"] = this.body;
		this.bodyParts["rightArm"] = this.rightArm;
		this.bodyParts["rightLeg"] = this.rightLeg;
		this.bodyParts["leftArm"] = this.leftArm;
		this.bodyParts["leftLeg"] = this.leftLeg;
		this.bodyParts["leftItem"] = this.leftItem;
		this.bodyParts["rightItem"] = this.rightItem;
		this.bodyParts["torso"] = this.torso;
		this.emoteEmoteFormat = emoteFormat;

		return this;
	}

	create2(
		beginTick: number,
		endTick: number,
		stopTick: number,
		isInfinite: boolean,
		returnToTick: number,
		bodyParts: { [id: string]: StateCollection },
		isEasingBefore: boolean,
		nsfw: boolean,
		uuid: UUID | undefined,
		emoteFormat: AnimationFormat,
		extraData: { [id: string]: Object },
	) {
		this.bodyParts = bodyParts;

		this.head = bodyParts["head"];
		this.body = bodyParts["body"];
		this.rightArm = bodyParts["rightArm"];
		this.rightLeg = bodyParts["rightLeg"];
		this.leftArm = bodyParts["leftArm"];
		this.leftLeg = bodyParts["leftLeg"];
		this.leftItem = bodyParts["leftItem"];
		this.rightItem = bodyParts["rightItem"];
		this.torso = bodyParts["torso"];

		this.beginTick = beginTick;
		this.endTick = endTick;
		this.stopTick = stopTick;
		this.isLooped = isInfinite;
		this.returnTick = returnToTick;
		this.isEasingBefore = isEasingBefore;
		this.nsfw = nsfw;
		this.uuid = uuid;
		this.extraData = extraData;
		this.name =
			extraData["name"] && extraData["name"] instanceof String
				? (extraData["name"] as string)
				: undefined;
		this.description =
			extraData["description"] &&
			extraData["description"] instanceof String
				? (extraData["description"] as string)
				: undefined;
		this.author =
			extraData["author"] && extraData["author"] instanceof String
				? (extraData["author"] as string)
				: undefined;
		this.emoteEmoteFormat = emoteFormat;

		// this.iconData = extraData["iconData"] && extraData["iconData"] instanceof ByteBuffer ? (ByteBuffer) extraData["iconData"] : undefined;
		// this.song = extraData["song"] && extraData["song"] instanceof NBS ? (NBS) extraData["song"] : undefined;
		return this;
	}

	setDescription(s: string) {
		this.description = s;
		return this;
	}

	setName(s: string) {
		this.name = s;
		return this;
	}

	setAuthor(s: string) {
		this.author = s;
		return this;
	}

	/**
	 * Create a new part. X, Y, Z the default offsets, pitch, yaw, roll are the default rotations.
	 *
	 * @param name     name
	 * @param x        x
	 * @param y        y
	 * @param z        z
	 * @param pitch    pitch
	 * @param yaw      yaw
	 * @param roll     roll
	 * @param bendable is it bendable
	 * @return ...
	 */
	getOrCreateNewPart(
		name: string,
		x: number,
		y: number,
		z: number,
		pitch: number,
		yaw: number,
		roll: number,
		bendable: boolean,
	) {
		if (!this.bodyParts[name]) {
			this.bodyParts[name] = new StateCollection().create1(
				x,
				y,
				z,
				pitch,
				yaw,
				roll,
				this.validationThreshold,
				bendable,
			);
		}
		return this.bodyParts[name];
	}

	/**
	 * Get a part with a name.
	 *
	 * @param name name
	 * @return ...
	 */
	getPart(name: string): StateCollection | undefined {
		return this.bodyParts[name];
	}

	getOrCreatePart(name: string) {
		if (!this.bodyParts[name]) {
			this.bodyParts[name] = new StateCollection().create2(
				this.validationThreshold,
			);
		}
		return this.bodyParts[name];
	}

	fullyEnableParts() {
		for (const key in Object.keys(this.bodyParts)) {
			this.bodyParts[key].fullyEnablePart(false);
		}
		return this;
	}

	/**
	 * Remove unnecessary keyframes from this emote.
	 * If the keyframe before and after are the same as the currently checked, the keyframe will be removed
	 */
	optimizeEmote() {
		for (const key in Object.keys(this.bodyParts)) {
			this.bodyParts[key].optimize(this.isLooped, this.returnTick);
		}
		return this;
	}

	/**
	 *
	 * @return Immutable copy of this
	 * @throws IllegalArgumentException if trying to build with invalid data.
	 */
	build() {
		if (this.name != null) this.extraData["name"] = this.name;
		if (this.description != null)
			this.extraData["description"] = this.description;
		if (this.author != null) this.extraData["author"] = this.author;

		// TODO: Someday (c) Maks_gaming
		// if (this.iconData != null) this.extraData["iconData"] = this.iconData
		// if (this.song != null) this.extraData["song"] = this.song

		return new KeyframeAnimation(
			this.beginTick,
			this.endTick,
			this.stopTick,
			this.isLooped,
			this.returnTick,
			this.bodyParts,
			this.isEasingBefore,
			this.nsfw,
			this.uuid ?? generateUUID(),
			this.emoteEmoteFormat,
			this.extraData,
		);
	}

	setUuid(uuid: UUID) {
		this.uuid = uuid;
		return this;
	}
}
