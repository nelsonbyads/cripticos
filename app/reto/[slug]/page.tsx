import { notFound } from 'next/navigation'
import { Game } from '@/components/Game'
import { getChallengeBySlug } from '@/lib/challenges'
import { normalizeAnswer } from '@/lib/text'

export const dynamic = 'force-dynamic'

export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const challenge = await getChallengeBySlug(slug)
  if (!challenge) notFound()
  return <main className="content-page"><p className="eyebrow">Archivo · Enigma #{challenge.number}</p><h1>Una palabra por descubrir.</h1><div className="challenge-spacer"><Game challenge={{ id: challenge.id, number: challenge.number, slug: challenge.slug, clue: challenge.clue, answerLength: normalizeAnswer(challenge.answer).length, publishAt: challenge.publishAt?.toISOString() ?? null }} /></div></main>
}
