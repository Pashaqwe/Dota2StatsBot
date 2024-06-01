import { Bot, webhookCallback } from "grammy";

// const token = process.env.TOKEN;
// if (!token) throw new Error(`BOT_TOKEN is unset ${token}`);

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

export default webhookCallback(bot, "std/http");

bot.command("start", (ctx) => {
  return ctx.reply("asd");
});

bot.start();
