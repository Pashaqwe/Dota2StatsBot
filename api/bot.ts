import { Bot, webhookCallback } from "grammy";
import express from "express";

// const token = process.env.TOKEN;
// if (!token) throw new Error(`BOT_TOKEN is unset ${token}`);

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

bot.command("start", (ctx) => {
  return ctx.reply("asd");
});

bot.start();

const app = express();
app.use(express.json());
app.use(`/api/bot`, webhookCallback(bot));
app.use(express.json()); // Добавляем middleware для парсинга JSON теле запроса

export default app;
// Исправляем определение маршрута
app.use("/api/bot", webhookCallback(bot, "std/http")); // Ук
