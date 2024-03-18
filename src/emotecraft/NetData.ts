import AnimationBuilder from "../player_animator/AnimationBuilder";
import KeyframeAnimation from "../player_animator/KeyframeAnimation";
import PacketTask from "./PacketTask";

export default class NetData {
	/**
	 * 0 - none, invalid
	 * 1 - stream emote
	 * 8 - config exchange
	 * 10 - stop
	 * //as the sub-packet ids
	 */
	purpose = PacketTask.UNKNOWN;
	//threshold: number;
	public stopEmoteID: UUID | undefined;
	public emoteData: KeyframeAnimation | undefined;
	public tick = 0;
	/**
	 * Is the emote is valid (Not validated)
	 */
	//public  valid: boolean;
	//Never use it permanently

	public wasEmoteData = false;
	public writeSong = true;

	public versionsUpdated = false;
	//public Map<Buffer, Buffer> versions;

	//Set it to non-undefined if sending via MC Plugin channel
	//left it undefined when using Collar
	public player: UUID | undefined;
	//Forced flag
	//On play, it can not be stopped by the player
	//On stop, the server stops it not because invalid but because event stopped it
	public isForced = false;

	public sizeLimit = 32767;

	extraData: { [key: string]: Object } = {};
	emoteBuilder: AnimationBuilder | undefined = undefined;

	public prepareAndValidate() {
		if (this.emoteBuilder != undefined) {
			if (this.emoteData != undefined) return false;
			if (!this.wasEmoteData) return false;
			this.emoteBuilder.extraData = this.extraData;
			this.emoteData = this.emoteBuilder.build();
		}

		if (this.purpose == PacketTask.UNKNOWN) return false;
		if (this.purpose == PacketTask.STOP && this.stopEmoteID == undefined)
			return false;
		if (this.purpose == PacketTask.STREAM && this.emoteData == undefined)
			return false;
		if (this.purpose == PacketTask.CONFIG && !this.versionsUpdated)
			return false;
		return this.emoteData == undefined || this.stopEmoteID == undefined;
		//I won't simplify it because of readability
	}

	public copy() {
		return Object.create(this);
	}
}
