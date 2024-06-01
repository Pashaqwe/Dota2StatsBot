import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

bot.command("start", (ctx) => {
  return ctx.reply("Hello!");
});

bot.start();

const app = express();
app.use(express.json());
app.use("/api/bot", webhookCallback(bot)); // Убедитесь, что webhookCallback правильно импортирован и используется
// app.use(express.json()); // Удалено дубликат

export default app;
