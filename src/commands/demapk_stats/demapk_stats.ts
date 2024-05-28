import {
  getDemapkLastDayMatchesRequest,
  getDemapkOnlyWinLastDayMatchesRequest,
  getHeroesListRequest,
} from "../../api";
import { TContext } from "../../config";
import { IHero, IMatch } from "../../models";

export const demapk_stats = async (ctx: TContext) => {
  if (!process.env.BASE_URL) throw new Error("Не найдена переменная BASE_URL");

  try {
    const getDemapkLastDayMatchesResponse =
      await getDemapkLastDayMatchesRequest();

    const getDemapkOnlyWinLastDayMatchesResponse =
      await getDemapkOnlyWinLastDayMatchesRequest();

    if (!getDemapkLastDayMatchesResponse.ok) {
      throw new Error(getDemapkLastDayMatchesResponse.statusText);
    } else if (!getDemapkOnlyWinLastDayMatchesResponse.ok) {
      throw new Error(getDemapkOnlyWinLastDayMatchesResponse.statusText);
    }

    if (!ctx.session.heroesList) {
      const getHeroesListResponse = await getHeroesListRequest();
      const heroesList: IHero[] = await getHeroesListResponse.json();

      if (!getHeroesListResponse.ok) {
        throw new Error(getHeroesListResponse.statusText);
      }

      ctx.session.heroesList = heroesList;
    }

    const matches: IMatch[] = await getDemapkLastDayMatchesResponse.json();
    const winMatches: IMatch[] =
      await getDemapkOnlyWinLastDayMatchesResponse.json();
    const heroName = (heroId: number) => {
      if (ctx.session.heroesList) {
        return ctx.session.heroesList.find((hero) => hero.id === heroId)
          ?.localized_name;
      }
    };
    const isThisMatchWin = (currentMatchId: number) =>
      winMatches.map(({ match_id }) => match_id).includes(currentMatchId);

    const message =
      "<b>Результаты игр Demapk за последние 24ч</b> \n\n" +
      `${matches.map(({ hero_id, kills, deaths, assists, match_id }) => {
        const messageItems = [
          `<b>Герой:</b> <i><b>${heroName(hero_id)}</b></i>`,
          `<b>KDA:</b> ` +
            ` ${ctx.emoji`${"crossed_swords"} ` + kills}` +
            ` ${ctx.emoji`${"skull"}` + deaths} ` +
            ` ${ctx.emoji`${"handshake"} ` + assists}`,
          `<b>Результат:</b> ` +
            `${
              isThisMatchWin(match_id)
                ? `${ctx.emoji`${"check_mark_button"}`} Победа`
                : `${ctx.emoji`${"cross_mark"}`} Поражение`
            }`,
          "______________________________",
        ];

        return messageItems.toString();
      })}`.replace(/,/g, "\n");

    await ctx.reply(message, { parse_mode: "HTML" });
  } catch (error) {
    await ctx.reply(
      `Сервис недоступен, повторите попытку позже\n<tg-spoiler>${error}</tg-spoiler>`,
      { parse_mode: "HTML" }
    );
  }
};
