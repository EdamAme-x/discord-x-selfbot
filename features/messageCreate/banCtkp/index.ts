import { Message } from "discord.js-selfbot-v13";

export const banCtkp = (message: Message) => {
    message.reply(`${"<@" + message.author.id.toString() + ">"} その鯖偽鯖やで。
本物は https://discord.gg/ctkpaarr?${Math.random().toString(16).substring(2, 7)}`);
}