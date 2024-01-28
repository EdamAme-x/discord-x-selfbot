import { Message } from "discord.js-selfbot-v13";

export const sayHello = (message: Message) => {
  message.reply("Hello! " + message.author.username);
};
