import { Selectable, Insertable, Updateable, Generated } from "kysely";

export default interface TableTester {
  id: Generated<number>;

  name: string;

  created_at: Generated<Date>;
}

export type TesterRow = Selectable<TableTester>;
export type InsertableTesterRow = Insertable<TableTester>;
export type UpdateableTesterRow = Updateable<TableTester>;
export * from "./actions";
