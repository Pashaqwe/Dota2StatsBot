export const getDemapkLastDayMatchesRequest = async () =>
  await fetch(`${process.env.BASE_URL}/players/96536197/matches?date=1`);

export const getHeroesListRequest = async () =>
  await fetch(`${process.env.BASE_URL}/heroes`);
