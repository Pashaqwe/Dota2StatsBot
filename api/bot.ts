import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("7261527510:AAFIYYCShhudAR0m0InYTZwAhLswVS9zyFw");

const app = express();
app.use(express.json());

app.use("/api/bot", webhookCallback(bot, "std/http"));

export default app;
