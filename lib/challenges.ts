import { and, asc, desc, eq, lte, or } from 'drizzle-orm'
import { db } from './db'
import { challenges } from './db/schema'

const available = () => or(eq(challenges.status, 'published'), and(eq(challenges.status, 'scheduled'), lte(challenges.publishAt, new Date())))

export function isPublicChallenge(challenge: { status: string; publishAt: Date | null }) {
  return challenge.status === 'published' || (challenge.status === 'scheduled' && Boolean(challenge.publishAt && challenge.publishAt <= new Date()))
}

export async function getTodayChallenge() {
  const [challenge] = await db.select().from(challenges).where(available()).orderBy(desc(challenges.publishAt), desc(challenges.number)).limit(1)
  return challenge ?? null
}

export async function getPublicArchive() {
  return db.select({ id: challenges.id, number: challenges.number, slug: challenges.slug, clue: challenges.clue, publishAt: challenges.publishAt })
    .from(challenges).where(available()).orderBy(desc(challenges.publishAt), desc(challenges.number))
}

export async function getChallengeBySlug(slug: string) {
  const [challenge] = await db.select().from(challenges).where(and(eq(challenges.slug, slug), available())).limit(1)
  return challenge ?? null
}

export async function getAllChallenges() {
  return db.select().from(challenges).orderBy(asc(challenges.number))
}
