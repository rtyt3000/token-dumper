import { program } from "commander";
import {BotClient} from "./client.js";
import * as fs from "node:fs";


program
    .name("Token Dumper")
    .description("A tool to dump users from telegram bots tokens")
    .version("0.0.1")
    .argument("<token>", "The token of the bot")
    .option("--apiId <apiId>", "The api id of telegram app")
    .option("--apiHash <apiHash>", "The api hash of telegram app")
    .option("-o, --output <output>", "The output file")
    .option("-s, --step <step>", "The step of messages to get", "1")
    .option("-c, --count <count>", "The count of steps to get", "10000")
    .option("-t, --timeout <timeout>", "The timeout between steps", "5000")
    .action(async (token: string, options) => {
            const bot = new BotClient()
            await bot.start(options.apiId, options.apiHash, token)
            const me = await bot.getMe()
            const uniqueSenders = await bot.getUniqueSenders(
                Number(options.count) - 1,
                Number(options.step),
                Number(options.timeout),
            )
            uniqueSenders.delete(me.id)
            const uniqueSendersString = `Bot ${token}: t.me/${me.username}\n`
                + `Total unique senders: ${uniqueSenders.size}\n\n`
                +  Array.from(uniqueSenders).join("\n")

            console.log(uniqueSendersString)
            if (options.output) {
                fs.writeFileSync(options.output, uniqueSendersString, {encoding: "utf-8"})
            }
            process.exit(0)
    })
    .addHelpText("after", "\nTelegram ID and Hash can be obtained from https://my.telegram.org")

program.parse()

