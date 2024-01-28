import { Message } from "discord.js-selfbot-v13";

export const pingPong = (message: Message) => {
  const start = performance.now();

  message.reply(`計測中・・・`);

  const ping = Math.floor(((performance.now() - start) / 2) * 1000 * 100) / 100;

  message.reply(
    `Pong! ${ping}ms Created by [@amex2189](https://twitter.com/amex2189)`,
  );
};
