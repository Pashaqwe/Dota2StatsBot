import { GrammyError, HttpError } from "grammy";
import "dotenv/config";
import { bot } from "./config";
import { demapk_stats } from "./commands";

bot.command("demapk_stats", async (ctx) => demapk_stats(ctx));

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
