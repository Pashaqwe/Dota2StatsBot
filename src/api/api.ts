export const getDemapkLastDayMatchesRequest = async () => {
  const params = new URLSearchParams({ date: "1" }).toString();

  return await fetch(
    `${process.env.BASE_URL}/players/96536197/matches?${params}`
  );
};

export const getDemapkOnlyWinLastDayMatchesRequest = async () => {
  const params = new URLSearchParams({ date: "1", win: "1" }).toString();

  return await fetch(
    `${process.env.BASE_URL}/players/96536197/matches?${params}`
  );
};

export const getHeroesListRequest = async () =>
  await fetch(`${process.env.BASE_URL}/heroes`);
