import { Bot } from "mineflayer";
import PacketClientHandler from "./packet/PacketClientHandler";
import StoredData from "./packet/StoredData";

export default class Core {
	readonly bot;

	readonly packetClientHandler;
	readonly storedData;

	constructor(bot: Bot) {
		this.bot = bot;

		this.packetClientHandler = new PacketClientHandler(this);
		this.storedData = new StoredData();
	}
}
