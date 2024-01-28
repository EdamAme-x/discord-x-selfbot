import { Client } from "discord.js-selfbot-v13";
import { EventRouter } from "./router";
import { Logger } from "./logger";
import { setupRouter } from './features';
import { config } from "dotenv";

const {
	TOKEN,
} = config().parsed ?? {
    TOKEN: process.env.TOKEN,
};

const router = new EventRouter();
const logger = new Logger();

logger.log("Info", `Starting...`);

const client = new Client({});
setupRouter(router);

client.on("ready", async () => {
	logger.log("Info", `Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", router.emit("messageCreate"))

client.login(TOKEN);
