import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";
import { Bot, Context, session, SessionFlavor } from "grammy";
import { ISessionData } from "./interfaces";

if (!process.env.TOKEN) {
  throw new Error("Токен не предоставлен");
}

type TContext = EmojiFlavor<Context & SessionFlavor<ISessionData>>;

const initialSessionData = (): ISessionData => {
  return { heroesList: null };
};

export const bot = new Bot<TContext>(process.env.TOKEN);

bot.use(session({ initial: initialSessionData }));
bot.use(emojiParser());

bot.api.setMyCommands([
  { command: "demapk_stats", description: "Матчи Demapk за текущий день" },
]);
