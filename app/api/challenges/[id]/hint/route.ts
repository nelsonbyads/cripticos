import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'
import { isPublicChallenge } from '@/lib/challenges'
import { normalizeAnswer } from '@/lib/text'

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id)).limit(1)
  if (!challenge || !isPublicChallenge(challenge)) return NextResponse.json({ error: 'Reto no encontrado' }, { status: 404 })
  const type = request.nextUrl.searchParams.get('type')
  if (type === 'definition') return NextResponse.json({ definition: challenge.definition })
  if (type === 'mechanism') return NextResponse.json({ technique: challenge.technique, mechanismHint: challenge.mechanismHint })
  if (type === 'letter') {
    const answer = normalizeAnswer(challenge.answer)
    const revealed = new Set((request.nextUrl.searchParams.get('revealed') ?? '').split(',').map(Number))
    const positions = [...answer].map((_, index) => index).filter((index) => !revealed.has(index))
    if (!positions.length) return NextResponse.json({ error: 'No quedan letras' }, { status: 400 })
    const position = positions[(challenge.number * 7 + revealed.size * 3) % positions.length]
    return NextResponse.json({ position, letter: answer[position] })
  }
  return NextResponse.json({ error: 'Tipo de pista inválido' }, { status: 400 })
}
