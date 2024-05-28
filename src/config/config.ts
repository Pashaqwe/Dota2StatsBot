import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";
import { Bot, Context } from "grammy";

if (!process.env.TOKEN) {
  throw new Error("Токен не предоставлен");
}

type TEmojiContext = EmojiFlavor<Context>;

export const bot = new Bot<TEmojiContext>(process.env.TOKEN);

bot.use(emojiParser());

bot.api.setMyCommands([
  { command: "demapk_stats", description: "Матчи Demapk за текущий день" },
]);
