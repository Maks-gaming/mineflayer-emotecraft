export default class AnimationFormat {
	static JSON_EMOTECRAFT = new AnimationFormat("json");
	static JSON_MC_ANIM = new AnimationFormat("json");
	static QUARK = new AnimationFormat("emote");
	static BINARY = new AnimationFormat("emotecraft");
	static SERVER = new AnimationFormat(undefined);
	static UNKNOWN = new AnimationFormat(undefined);

	private readonly extension;

	constructor(extension: string | undefined) {
		this.extension = extension;
	}

	getExtension() {
		return this.extension;
	}
}
