import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error('Falta DATABASE_URL')

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> }
const sql = globalForDb.sql ?? postgres(connectionString, { max: process.env.NODE_ENV === 'production' ? 5 : 1 })
if (process.env.NODE_ENV !== 'production') globalForDb.sql = sql

export const db = drizzle(sql)
