import {
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),

  gender: text("gender").notNull(),
  genderProbability: doublePrecision("gender_probability").notNull(),
  sampleSize: doublePrecision("sample_size").notNull(),

  age: doublePrecision("age").notNull(),
  ageGroup: text("age_group").notNull(),

  countryId: text("country_id").notNull(),
  countryProbability: doublePrecision("country_probability").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
