export const up = async (db) => {
  await db.schema
    .createTable("tester")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.unique())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(db.raw("NOW()"))
    )
    .execute();

  await db
    .insertInto("tester")
    .values([
      {
        name: "Scott",
      },
      {
        name: "Paul",
      },
    ])
    .execute();
};

export const down = async (db) => {
  await db.schema.dropTable("tester").execute();
};
