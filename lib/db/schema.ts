import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const challengeStatus = pgEnum('challenge_status', ['draft', 'scheduled', 'published', 'archived'])

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 120 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  number: integer('number').notNull().unique(),
  slug: varchar('slug', { length: 160 }).notNull().unique(),
  clue: text('clue').notNull(),
  answer: varchar('answer', { length: 100 }).notNull(),
  definition: text('definition').notNull(),
  technique: varchar('technique', { length: 80 }).notNull(),
  mechanismHint: text('mechanism_hint').notNull(),
  explanation: text('explanation').notNull(),
  author: varchar('author', { length: 120 }),
  status: challengeStatus('status').notNull().default('draft'),
  publishAt: timestamp('publish_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export type Challenge = typeof challenges.$inferSelect
export type NewChallenge = typeof challenges.$inferInsert
