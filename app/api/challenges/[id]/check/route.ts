import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'
import { isPublicChallenge } from '@/lib/challenges'
import { normalizeAnswer } from '@/lib/text'

const input = z.object({ answer: z.string().max(120) })

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const parsed = input.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Respuesta inválida' }, { status: 400 })
  const { id } = await context.params
  const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id)).limit(1)
  if (!challenge || !isPublicChallenge(challenge)) return NextResponse.json({ error: 'Reto no encontrado' }, { status: 404 })
  const correct = normalizeAnswer(parsed.data.answer) === normalizeAnswer(challenge.answer)
  return NextResponse.json(correct ? { correct, answer: challenge.answer, explanation: challenge.explanation } : { correct })
}
