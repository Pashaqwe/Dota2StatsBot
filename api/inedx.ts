import { webhookCallback } from "grammy";
import { bot } from "../src/config";

export default webhookCallback(bot);
