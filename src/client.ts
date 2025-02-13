import {MemoryStorage, Message, TelegramClient} from "@mtcute/node";

export const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export class BotClient {

    private _tg!: TelegramClient;

     start = async (id: string, hash: string, token: string) => {
         this._tg = new TelegramClient({
             storage: new MemoryStorage(),
             apiHash: hash,
             apiId: Number(id),
         })
         await this._tg.start({botToken: token})
    }

    getMe = async () => await this._tg.getMe()

    private _getUniqueSenders = async (messages: (Message | null)[]) => {
        const senders = new Set<number>()
        messages.forEach((message) => {
            if (message) {
                senders.add(message.sender.id)
            }
        })
        return senders


     }
    getUniqueSendersFromMessageId = async (from: number, to: number) => {
        const messages = await this._tg.getMessagesUnsafe(range(from, to))
        return this._getUniqueSenders(messages)
    }

    getUniqueSenders = async (messagesStep: number, messagesStepsCount: number, timeout: number) => {
        const uniqueSenders = new Set<number>()
        for (const i of range(0, messagesStepsCount)) {
            const messagesSenders = await this.getUniqueSendersFromMessageId(i * messagesStep, (i + 1) * messagesStep)
            messagesSenders.forEach(sender => uniqueSenders.add(sender))
            await sleep(timeout)
            console.log(`Step ${i + 1} of ${messagesStepsCount}`)
        }
        console.log(`Total unique senders: ${uniqueSenders.size}`)
        return uniqueSenders
    }

}