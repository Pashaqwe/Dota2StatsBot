import { TContext } from "../../config";
import { getUserMatchesListMessage } from "../../features";

export const demapk_stats = async (ctx: TContext) => {
  if (!process.env.DEMAPK_ID)
    throw new Error("Не найдена переменная DEMAPK_ID");

  await getUserMatchesListMessage({ ctx, userId: process.env.DEMAPK_ID });
};
