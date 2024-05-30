import { IGetMatchesRequestParams } from "./interfaces";

export const getMatchesRequest = async ({
  date,
  userId,
  win,
}: IGetMatchesRequestParams) => {
  const params = new URLSearchParams({ date: date });

  if (win) params.append("win", win);

  return await fetch(
    `${process.env.BASE_URL}/players/${userId}/matches?${params.toString()}`
  );
};

export const getHeroesListRequest = async () =>
  await fetch(`${process.env.BASE_URL}/heroes`);

export const getUserInfoRequest = async ({ userId }: { userId: string }) =>
  await fetch(`${process.env.BASE_URL}/players/${userId}`);
