import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import postgres from 'postgres'

async function migrate() {
  if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL')
  const sql = postgres(process.env.DATABASE_URL, { max: 1 })
  const migration = await readFile(new URL('../drizzle/0000_initial.sql', import.meta.url), 'utf8')
  await sql.unsafe(migration)
  await sql.end()
  console.log('Migración aplicada correctamente')
}

migrate().catch((error) => { console.error(error); process.exit(1) })
