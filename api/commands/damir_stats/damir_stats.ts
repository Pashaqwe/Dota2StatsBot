import { TContext } from "../../config";
import { getUserMatchesListMessage } from "../../features";

export const damir_stats = async (ctx: TContext) => {
  if (!process.env.DAMIR_ID) throw new Error("Не найдена переменная DAMIR_ID");
  console.log("s");

  await getUserMatchesListMessage({ ctx, userId: process.env.DAMIR_ID });
};
