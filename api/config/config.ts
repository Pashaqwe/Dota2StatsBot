import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";
import { Bot, Context, session, SessionFlavor, webhookCallback } from "grammy";
import { ISessionData } from "./interfaces";

if (!process.env.TOKEN) {
  throw new Error("Токен не предоставлен");
}

export type TContext = EmojiFlavor<Context & SessionFlavor<ISessionData>>;

const initialSessionData = (): ISessionData => {
  return { heroesList: null };
};

export const myBot = new Bot<TContext>(process.env.TOKEN);

myBot.use(session({ initial: initialSessionData }));
myBot.use(emojiParser());

myBot.api.setMyCommands([
  { command: "demapk_stats", description: "Матчи Demapk за текущий день" },
  { command: "damir_stats", description: "Матчи Домы за текущий день" },
]);

export const bot = webhookCallback(myBot, "std/http");
