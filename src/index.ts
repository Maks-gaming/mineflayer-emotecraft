import { Bot } from "mineflayer";
import EmoteCraft, { log } from "./lib";

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
