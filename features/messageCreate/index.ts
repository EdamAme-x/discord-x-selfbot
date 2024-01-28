import { Message } from "discord.js-selfbot-v13";
import { sayHello } from "./sayHello";
import { banCtkp } from "./banCtkp";
import { Logger } from "../../logger";

const logger = new Logger();

const closure = {
  lastBanCtkp: 0,
};

export const messageCreate = async (message: Message) => {
  try {
    if (message.author.bot) {
      return;
    }

    const content = message.content;

    if (content.startsWith(".hello")) {
      logger.log(
        "Info",
        `Hello: ${message.author.username} at ${message.guildId}`,
      );
      sayHello(message);
    }

    const baseContent = content
      .replace(/\:443/g, "")
      .replace(/\/invite\/ctkp/g, "/ctkp")
      .replace(/discord\.com/g, "discord.gg")
      .replace(/7eYYNNJQ8e/g, "ctkp")
      .replace(/imgur\.com\/a/g, "discord.gg/")
      .replace(/xm4alwsz/g, "ctkp")
      .replace(/n5rS8wp/g, "ctkp")
      .replace(/gVcDw0G/g, "ctkp")
      .replace(/ctkp.net/, "discord.gg/ctkp")
      .replace(/ctkp.wiki/, "discord.gg/ctkp")
      .toLowerCase();
    if (
      closure.lastBanCtkp + 10 * 1000 < Date.now() &&
      (/discord\.gg(:\d+)?\/ctkp(?:\b|$)/.test(baseContent) ||
        /discord\.gg(:\d+)?\/ctkp(#:\b|$)/.test(baseContent) ||
        /discord\.gg(:\d+)?\/ctkp(\/:\b|$)/.test(baseContent))
    ) {
      logger.log(
        "Info",
        `Ban Ctkp ${message.author.username} at ${message.guildId}`,
      );
      closure.lastBanCtkp = Date.now();
      banCtkp(message);
    }
  } catch (error) {
    logger.log("Error", error);
  }
};
