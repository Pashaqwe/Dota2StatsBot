import { webhookCallback } from "grammy";
import express from "express";
import { bot } from "../src/config/config.ts";

const app = express();
app.use(express.json());

// Используйте webhookCallback для обработки входящих обновлений
app.use("/api/bot", webhookCallback(bot));

export default app;
