import { Bot, GrammyError, HttpError, Context } from "grammy";
import "dotenv/config";
import { demapkLastDayMatchesRequest } from "./api";
import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";

if (!process.env.TOKEN) {
  throw new Error("Токен не предоставлен");
}

type TEmojiContext = EmojiFlavor<Context>;

const bot = new Bot<TEmojiContext>(process.env.TOKEN);

bot.use(emojiParser());

bot.api.setMyCommands([
  { command: "demapk_stats", description: "Матчи Demapk за текущий день" },
]);

bot.command("start", async (ctx) => {
  await ctx.reply("Test1");
});

bot.command("demapk_stats", async (ctx) => {
  if (!process.env.BASE_URL) throw new Error("Не найдена переменная BASE_URL");

  const matches = await demapkLastDayMatchesRequest();

  const message = `${matches.map(
    (match) =>
      `${ctx.emoji`${"kitchen_knife"}` + match.kills} ${
        ctx.emoji`${"coffin"}` + match.deaths
      } ${ctx.emoji`${"handshake"}` + match.assists}\n`
  )}`.replace(/,/g, "\n");

  await ctx.reply(message, { parse_mode: "HTML" });
});

bot.catch(({ ctx, error }) => {
  console.error(`Ошибка ${ctx.update.update_id}`);

  if (error instanceof GrammyError) {
    console.error(`Ошибка бота ${error.description}`);
  } else if (error instanceof HttpError) {
    console.error(`Ошибка http ${error}`);
  } else {
    console.error(`Неизвестная ошибка ${error}`);
  }
});

bot.start();
