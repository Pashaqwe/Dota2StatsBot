import {
  getHeroesListRequest,
  getMatchesRequest,
  getUserInfoRequest,
} from "../../api";
import { IHero, IMatch, IUserInfo } from "../../models";
import { IGetUserMatchesListMessage } from "./interfaces";

export const getUserMatchesListMessage = async ({
  ctx,
  userId,
  date,
}: IGetUserMatchesListMessage) => {
  if (!process.env.BASE_URL) throw new Error("Не найдена переменная BASE_URL");

  try {
    const commonRequestParams = {
      userId: userId,
      date: date || "1",
    };

    const getLastDayMatchesResponse = await getMatchesRequest(
      commonRequestParams
    );

    const getOnlyWinLastDayMatchesResponse = await getMatchesRequest({
      ...commonRequestParams,
      win: "1",
    });

    const getUserInfoResponse = await getUserInfoRequest({
      userId,
    });

    if (!getLastDayMatchesResponse.ok) {
      throw new Error(getLastDayMatchesResponse.statusText);
    } else if (!getOnlyWinLastDayMatchesResponse.ok) {
      throw new Error(getOnlyWinLastDayMatchesResponse.statusText);
    } else if (!getUserInfoResponse.ok) {
      throw new Error(getUserInfoResponse.statusText);
    }

    if (!ctx.session.heroesList) {
      const getHeroesListResponse = await getHeroesListRequest();
      const heroesList: IHero[] = await getHeroesListResponse.json();

      if (!getHeroesListResponse.ok) {
        throw new Error(getHeroesListResponse.statusText);
      }

      ctx.session.heroesList = heroesList;
    }

    const matches: IMatch[] = await getLastDayMatchesResponse.json();
    const winMatches: IMatch[] = await getOnlyWinLastDayMatchesResponse.json();
    const userInfo: IUserInfo = await getUserInfoResponse.json();
    const userNickName = userInfo.profile.personaname;
    const heroName = (heroId: number) => {
      if (ctx.session.heroesList) {
        return ctx.session.heroesList.find((hero) => hero.id === heroId)
          ?.localized_name;
      }
    };
    const isThisMatchWin = (currentMatchId: number) =>
      winMatches.map(({ match_id }) => match_id).includes(currentMatchId);

    const message =
      `<b>Результаты игр ${userNickName} за последние 24ч</b> \n\n` +
      `${matches.map(({ hero_id, kills, deaths, assists, match_id }) => {
        const messageItems = [
          `<b>Герой:</b> <i><b>${heroName(hero_id)}</b></i>`,
          `<b>KDA:</b> ` +
            ` ${ctx.emoji`${"crossed_swords"} ` + kills}` +
            ` ${ctx.emoji`${"skull"} ` + deaths}` +
            ` ${ctx.emoji`${"handshake"} ` + assists}`,
          `<b>Результат:</b> ` +
            `${
              isThisMatchWin(match_id)
                ? `${ctx.emoji`${"check_mark_button"}`} Победа`
                : `${ctx.emoji`${"cross_mark"}`} Поражение`
            }`,
          `<b>Подробнее:</b> <a href="${
            "https://www.opendota.com/matches/" + match_id
          }">Ссылка</a>`,
          "______________________________",
        ];

        return messageItems.toString();
      })}`.replace(/,/g, "\n");

    await ctx.reply(message, {
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    });
  } catch (error) {
    await ctx.reply(
      `Сервис недоступен, повторите попытку позже\n<tg-spoiler>${error}</tg-spoiler>`,
      { parse_mode: "HTML" }
    );
  }
};
