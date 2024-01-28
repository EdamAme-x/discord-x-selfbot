import { Message } from "discord.js-selfbot-v13";
import { Logger } from "../../logger";
import { sayHello } from "./sayHello";
import { banCtkp } from "./banCtkp";
import { pingPong } from "./pingPong";
import { ddos } from "./ddos";

const logger = new Logger();

const closure = {
  lastBanCtkp: 0,
};

export const messageCreate = async (message: Message) => {
  try {
    if (message.author.bot) {
      return;
    }

    if (message.inGuild()) {
      if (
        !message.guild?.members.me?.permissions.has("SEND_MESSAGES") ||
        !message.guild?.members.me?.permissions.has("VIEW_CHANNEL") ||
        !message.guild?.members.me?.permissions.has("SEND_MESSAGES_IN_THREADS")
      ) {
        return;
      }
    }

    const content = message.content;

    if (content.startsWith(".hello")) {
      logger.log(
        "Info",
        `Hello: ${message.author.username} at ${message.guildId}`,
      );
      sayHello(message);
    }

    if (content.trim() === ".ping") {
      logger.log(
        "Info",
        `pong! ${message.author.username} at ${message.guildId}`,
      );
      pingPong(message);
    }

    if (content.startsWith(".ddos")) {
      await ddos(message);
    }

    const baseContent = content
      .toLowerCase()
      .replace(/\:443/g, "")
      .replace(/\[\.\]/g, ".")
      .replace(/\.\./g, ".")
      .replace(/\.\s*/g, ".")
      .replace(/\_\_/g, "")
      .replace(/\*\*/g, "")
      .replace(/\`\`\`/g, "")
      .replace(/\s/g, "")
      .replace(/\s*\./g, ".")
      .replace(/\/invite\/ctkp/g, "/ctkp")
      .replace(/discord\.com/g, "discord.gg")
      .replace(/7eyynnjq8e/g, "ctkp")
      .replace(/imgur\.com\/a/g, "discord.gg/")
      .replace(/xm4alwsz/g, "ctkp")
      .replace(/n5rs8wp/g, "ctkp")
      .replace(/gvcdw0g/g, "ctkp")
      .replace(/ctkp.net/, "discord.gg/ctkp")
      .replace(/ctkp.wiki/, "discord.gg/ctkp")
      .toLowerCase();
    if (
      message.guildId &&
      message.author.id !== message.guild?.members.me?.id &&
      closure.lastBanCtkp + 10 * 0 < Date.now() &&
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
