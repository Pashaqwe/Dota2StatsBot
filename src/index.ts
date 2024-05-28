import { GrammyError, HttpError } from "grammy";
import "dotenv/config";
import { getDemapkLastDayMatchesRequest, getHeroesListRequest } from "./api";
import { IMatch } from "./models/IMatch";
import { IHero } from "./models/IHero";
import { bot } from "./config";

bot.command("demapk_stats", async (ctx) => {
  if (!process.env.BASE_URL) throw new Error("Не найдена переменная BASE_URL");

  try {
    const getDemapkLastDayMatchesResponse =
      await getDemapkLastDayMatchesRequest();
    const getHeroesListResponse = await getHeroesListRequest();

    if (!getDemapkLastDayMatchesResponse.ok) {
      throw new Error(getDemapkLastDayMatchesResponse.statusText);
    } else if (!getHeroesListResponse.ok) {
      throw new Error(getHeroesListResponse.statusText);
    }

    const matches: IMatch[] = await getDemapkLastDayMatchesResponse.json();
    const heroesList: IHero[] = await getHeroesListResponse.json();
    const heroName = (heroId: number) =>
      heroesList.find((hero) => hero.id === heroId)?.localized_name;

    const message = `${matches.map(
      (match) =>
        `<b>${heroName(match.hero_id)}</b> ` +
        `${ctx.emoji`${"kitchen_knife"}` + match.kills}` +
        `${ctx.emoji`${"coffin"}` + match.deaths}` +
        `${ctx.emoji`${"handshake"}` + match.assists}\n`
    )}`.replace(/,/g, "\n");

    await ctx.reply(message, { parse_mode: "HTML" });
  } catch (error) {
    await ctx.reply(
      `Сервис недоступен, повторите попытку позже\n<tg-spoiler>${error}</tg-spoiler>`,
      { parse_mode: "HTML" }
    );
  }
});

bot.catch(({ ctx, error }) => {
  console.error(`Ошибка ${ctx.update.update_id}`);

  if (error instanceof GrammyError) {
    console.error(`Ошибка бота ${error.description}`);
  } else if (error instanceof HttpError) {
    console.error(`Ошибка http ${error}`);
  } else {
    console.error(`Неизвестная ошибка ${error}`);
  }
});

bot.start();
