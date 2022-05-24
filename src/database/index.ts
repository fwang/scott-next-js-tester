import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import RDSDataService from "aws-sdk/clients/rdsdataservice.js";
import TableTester from "./Entity/Tester";

interface Database {
  tester: TableTester;
}

const DB = new Kysely<Database>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      client: new RDSDataService(),
      database: process.env.DATABASE ?? "",
      secretArn: process.env.SECRET_ARN ?? "",
      resourceArn: process.env.CLUSTER_ARN ?? "",
    },
  }),
});

export default DB;
