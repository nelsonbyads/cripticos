import 'dotenv/config'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../lib/db'
import { adminUsers, challenges } from '../lib/db/schema'
import { LAUNCH_DATE, puzzles } from '../src/data'
import { slugify } from '../lib/text'

async function seed() {
  const email = (process.env.ADMIN_EMAIL ?? '').toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? ''
  if (!email || password.length < 10) throw new Error('Configura ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 10 caracteres)')
  const [existingAdmin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1)
  const passwordHash = await hash(password, 12)
  if (existingAdmin) await db.update(adminUsers).set({ passwordHash, active: true }).where(eq(adminUsers.id, existingAdmin.id))
  else await db.insert(adminUsers).values({ email, name: 'Administrador', passwordHash })

  for (const [index, puzzle] of puzzles.entries()) {
    const publishAt = new Date(`${LAUNCH_DATE}T12:00:00-05:00`)
    publishAt.setDate(publishAt.getDate() + index)
    const [existing] = await db.select().from(challenges).where(eq(challenges.number, puzzle.id)).limit(1)
    const values = { number: puzzle.id, slug: slugify(`enigma-${puzzle.id}-${puzzle.answer}`), clue: puzzle.clue, answer: puzzle.answer, definition: puzzle.definition, technique: puzzle.technique, mechanismHint: puzzle.mechanism, explanation: puzzle.explanation, status: 'published' as const, publishAt, updatedAt: new Date() }
    if (existing) await db.update(challenges).set(values).where(eq(challenges.id, existing.id))
    else await db.insert(challenges).values(values)
  }
  console.log(`Base preparada: ${puzzles.length} enigmas y administrador ${email}`)
}

seed().then(() => process.exit(0)).catch((error) => { console.error(error); process.exit(1) })
