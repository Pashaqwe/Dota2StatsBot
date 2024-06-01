import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

bot.command("start", (ctx) => {
  return ctx.reply("Hello!");
});

bot.start();

const app = express();
app.use(express.json()); // Добавляем middleware для парсинга JSON теле запроса

// Исправляем определение маршрута
app.use("/api/bot", webhookCallback(bot, "std/http")); // Ук
