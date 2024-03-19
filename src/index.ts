import { Bot } from "mineflayer";
import EmoteCraft, { log } from "./lib";

import fs from "fs";
import AnimationJson from "./emotecraft/gson/AnimationJson";
const buf = fs.readFileSync("test_emote.json")!;
const data = JSON.parse(buf.toString("utf-8"));
const res = new AnimationJson().deserialize(data) as any;
console.log(res[0]["extraData"]);

/** The function for changing the logging level, by default - 4, and these are warnings, errors and fatal */
export function setLoggingLevel(level: number = 4) {
	log.settings.minLevel = level;
}

export function plugin(bot: Bot) {
	bot.emotecraft = new EmoteCraft(bot);
}

export * from "./lib";

export default plugin;

declare module "mineflayer" {
	interface Bot {
		emotecraft: EmoteCraft;
	}
	interface BotEvents {
		emotecraft_emote_end: () => void;
	}
}
