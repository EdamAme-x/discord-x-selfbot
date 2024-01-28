import { Message } from "discord.js-selfbot-v13";
import { sayHello } from './sayHello';
import { banCtkp } from "./banCtkp";
import { Logger } from '../../logger';

const logger = new Logger();

const closure = {
    lastBanCtkp: Date.now()
}

export const messageCreate = async (message: Message) => {
    try {
        if (message.author.bot) {
            return;
        }

        const content = message.content;
    
        if (content.startsWith(".hello")) {
            logger.log("Info", `Hello: ${message.author.username} at ${message.guildId}`);
            sayHello(message);
        }

        if (closure.lastBanCtkp + 10 * 1000 < Date.now() && /discord\.gg(:\d+)?\/ctkp(?:\b|$)/.test(content)) {
            logger.log("Info", `Ban Ctkp ${message.author.username} at ${message.guildId}`);
            closure.lastBanCtkp = Date.now();
            banCtkp(message);
        }
    }catch (error) {
        logger.log("Error", error);
    }
}