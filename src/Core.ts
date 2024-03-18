import { Bot } from "mineflayer";

export default class Core {
	readonly bot;

	constructor(bot: Bot) {
		this.bot = bot;
	}
}
