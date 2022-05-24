import { TesterRow } from "./Tester";
import Database from "../index";

export async function listTesters(db: typeof Database): Promise<TesterRow[]> {
  const testers = await db.selectFrom("tester").selectAll().execute();

  return testers;
}
