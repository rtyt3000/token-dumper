import { program } from "commander";
import {BotClient} from "./client.js";


program
    .name("Token Dumper")
    .description("A tool to dump users from telegram bots tokens")
    .version("0.0.1")
    .argument("<token>", "The token of the bot")
    .option("--apiId <apiId>", "The api id of telegram app")
    .option("--apiHash <apiHash>", "The api hash of telegram app")
    .option("-o, --output <output>", "The output file")
    .option("-s, --step <step>", "The step of messages to get", "100")
    .option("-c, --count <count>", "The count of steps to get", "100")
    .action(async (token: string, options) => {
            const bot = new BotClient()
            await bot.start(options.apiId, options.apiHash, token)
            const uniqueSenders = await bot.getUniqueSenders(Number(options.step), Number(options.count))
            console.log(uniqueSenders)
            process.exit(0)
    })
    .addHelpText("after", "\nTelegram ID and Hash can be obtained from https://my.telegram.org")

program.parse()

