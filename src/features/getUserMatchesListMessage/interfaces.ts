import { TContext } from "../../config";

export interface IGetUserMatchesListMessage {
  ctx: TContext;
  userId: string;
  date?: string;
}
