import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

const app = express();
app.use(express.json());

// Используйте webhookCallback для обработки входящих обновлений
app.use("/api/bot", webhookCallback(bot));

// Определите команды для вашего бота
bot.command("start", (ctx) => ctx.reply("Hello"));

// Запустите бота
bot.start();

export default app;
