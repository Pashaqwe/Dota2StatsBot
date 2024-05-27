import { IMatch } from "../models/IMatch";

export const demapkLastDayMatchesRequest = async (): Promise<IMatch[]> =>
  await fetch(`${process.env.BASE_URL}/players/96536197/matches?date=2`).then(
    (res) => res.json()
  );
