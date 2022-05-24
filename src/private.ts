import db from "./database";
import { listTesters } from "./database/Entity/actions";

const baseHandler = async (event: any) => {
  console.log("You are signed in");
  try {
    const testers = await listTesters(db);
    return {
      statusCode: 200,
      body: JSON.stringify(testers),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};

export const main = baseHandler;
