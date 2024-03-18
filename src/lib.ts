import { Bot } from "mineflayer";
import { Logger } from "tslog";
import Core from "./Core";

export const log = new Logger({ minLevel: 4 });

export default class EmoteCraft {
	private readonly bot;
	private _core;

	constructor(bot: Bot) {
		this.bot = bot;
		this._core = new Core(this.bot);
	}
}
