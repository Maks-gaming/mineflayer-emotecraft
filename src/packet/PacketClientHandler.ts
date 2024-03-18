import Core from "../Core";
import { log } from "../lib";
import PacketClientEncoder from "./PacketClientEncoder";

export default class PacketClientHandler {
	private readonly core;

	readonly packetEncoder;

	// Packets
	// TODO: Packets

	constructor(core: Core) {
		this.core = core;

		log.debug("Registering client packet encoder");
		this.packetEncoder = new PacketClientEncoder(this.core);

		log.debug("Registering client packets");
		// TODO: Init packets

		/*
		Events
		*/
	}
}
