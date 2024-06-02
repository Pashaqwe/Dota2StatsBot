import { Composer, GrammyError, HttpError } from "grammy";
import "dotenv/config";
import { bot, TContext } from "./config";
import { damir_stats, demapk_stats } from "./commands";
import { development, production } from "./utils";

const composer = new Composer<TContext>();

composer.command("demapk_stats", async (ctx) => demapk_stats(ctx));

composer.command("damir_stats", async (ctx) => damir_stats(ctx));

bot.catch(({ ctx, error }) => {
  console.error(`Ошибка ${ctx.update.update_id}`);

  if (error instanceof GrammyError) {
    console.error(`Ошибка бота ${error.description}`);
  } else if (error instanceof HttpError) {
    console.error(`Ошибка http ${JSON.stringify(error)}`);
  } else {
    console.error(`Неизвестная ошибка ${error}`);
  }
});

bot.use(composer);

process.env.NODE_ENV === "development" ? development(bot) : production(bot);
