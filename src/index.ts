import { Bot } from "grammy";
import "dotenv/config";

if (!process.env.TOKEN) {
  throw new Error("Токен не предоставлен");
}

const bot = new Bot(process.env.TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply("Test1");
});

bot.start();
