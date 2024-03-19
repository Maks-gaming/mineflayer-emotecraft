import AnimationBuilder from "../../player_animator/AnimationBuilder";
import AnimationFormat from "../../player_animator/AnimationFormat";
import KeyframeAnimation from "../../player_animator/KeyframeAnimation";
import State from "../../player_animator/State";
import { Easing } from "../../player_animator/util/Ease";
import Utils from "../../utils";

export default class AnimationJson {
	private readonly modVersion = 3;

	public deserialize(node: any): KeyframeAnimation[] {
		if (!node["emote"]) {
			throw new Error("Unsupported by owner of this plugin (for now)");
			//return GeckoLibSerializer.serialize(node);
		}

		let version = 1;
		if (node["version"]) version = node["version"] as number;
		//Text author = EmoteInstance.instance.getDefaults().emptyTex();
		const emote = this.emoteDeserializer(node["emote"], version);

		//Text name = EmoteInstance.instance.getDefaults().fromJson(node["name"]);

		Object.entries(node).forEach(([key, value]) => {
			if (key == "uuid" || key == "comment" || key == "version") return;

			if (true /*||  value.isJsonPrimitive() */) {
				emote.extraData[key] = value as object;
			}
		});

		emote.name = node["name"] as string;
		if (node["author"]) {
			emote.author = node["author"] as string;
		}

		if (node["description"]) {
			emote.description = node["description"] as string;
		}

		// if(modVersion < version){
		//     throw new Error(emote.name + " is version " + version + ". PlayerAnimator library can only process version " + modVersion + ".");
		// }

		if (node["uuid"]) {
			emote.uuid = Utils.UUIDfromString(node["uuid"] as string);
		}

		emote.optimizeEmote();
		return [emote.build()];
	}

	private emoteDeserializer(node: any, version: number) {
		const builder = new AnimationBuilder().create1(
			AnimationFormat.JSON_EMOTECRAFT,
		);

		if (node["beginTick"]) {
			builder.beginTick = node["beginTick"] as number;
		}
		builder.endTick = node["endTick"] as number;
		if (builder.endTick <= 0)
			throw new Error("endTick must be bigger than 0");
		if (node["isLoop"] && node["returnTick"]) {
			builder.isLooped = node["isLoop"] as boolean;
			builder.returnTick = node["returnTick"] as number;
			if (
				builder.isLooped &&
				(builder.returnTick > builder.endTick || builder.returnTick < 0)
			)
				throw new Error(
					"return tick have to be smaller than endTick and not smaller than 0",
				);
		}

		if (node["nsfw"]) {
			builder.nsfw = node["nsfw"] as boolean;
		}

		builder.stopTick = node["stopTick"]
			? (node["stopTick"] as number)
			: builder.endTick;
		const degrees = !node["degrees"] || (node["degrees"] as boolean);
		//KeyframeAnimation emote = new KeyframeAnimation(beginTick, endTick, resetTick, isLoop, returnTick);
		if (node["easeBeforeKeyframe"])
			builder.isEasingBefore = node["easeBeforeKeyframe"] as boolean;
		this.moveDeserializer(builder, node["moves"], degrees, version);

		builder.fullyEnableParts();

		return builder;
	}

	private moveDeserializer(
		emote: AnimationBuilder,
		node: any[],
		degrees: boolean,
		version: number,
	) {
		node.forEach((obj) => {
			const tick = obj["tick"] as number;
			const easing = (obj["easing"] as string) ?? "linear";
			const turn = (obj["turn"] as number) ?? 0;

			Object.entries(obj).forEach(([key, value]) => {
				if (
					key == "tick" ||
					key == "comment" ||
					key == "easing" ||
					key == "turn"
				) {
					return;
				}

				this.addBodyPartIfExists(
					emote,
					key,
					obj[key],
					degrees,
					tick,
					easing,
					turn,
					version,
				);
			});
		});
	}

	private addBodyPartIfExists(
		emote: AnimationBuilder,
		name: string,
		partNode: any,
		degrees: boolean,
		tick: number,
		easing: string,
		turn: number,
		version: number,
	) {
		if (version < 3 && name == "torso") name = "body"; // rename part
		const part = emote.getOrCreatePart(name);

		this.addPartIfExists(
			part.x,
			"x",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.y,
			"y",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.z,
			"z",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.pitch,
			"pitch",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.yaw,
			"yaw",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.roll,
			"roll",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.bend!,
			"bend",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
		this.addPartIfExists(
			part.bendDirection!,
			"axis",
			partNode,
			degrees,
			tick,
			easing,
			turn,
		);
	}

	private addPartIfExists(
		part: State,
		name: string,
		node: any,
		degrees: boolean,
		tick: number,
		easing: string,
		turn: number,
	) {
		if (node[name]) {
			part.addKeyFrame1(
				tick,
				node[name] as number,
				Easing.easeFromString(easing),
				turn,
				degrees,
			);
		}
	}
}
