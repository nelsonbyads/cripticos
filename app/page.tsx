import { AdSlot } from '@/components/AdSlot'
import { Game } from '@/components/Game'
import { getTodayChallenge } from '@/lib/challenges'
import { normalizeAnswer } from '@/lib/text'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const challenge = await getTodayChallenge()
  return <main>
    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT} label="Publicidad superior" />
    <section className="hero game-width"><div><p className="eyebrow">Una pausa para pensar</p><h1>La palabra está ahí.<br /><em>Solo falta verla.</em></h1></div><p>Un enigma nuevo cada día<br />para mentes curiosas.</p></section>
    <div className="game-width">{challenge ? <Game challenge={{ id: challenge.id, number: challenge.number, slug: challenge.slug, clue: challenge.clue, answerLength: normalizeAnswer(challenge.answer).length, publishAt: challenge.publishAt?.toISOString() ?? null }} /> : <section className="empty-state"><p className="eyebrow">Próximamente</p><h2>El próximo enigma se está preparando.</h2><p>Vuelve pronto para estrenar tu racha.</p></section>}</div>
    <section className="manifesto"><div><p className="eyebrow">Cómo funciona</p><h2>Dos lecturas.<br />Una sola respuesta.</h2></div><p>La frase contiene una definición y un juego de palabras. Encuentra ambas capas, escribe la respuesta y comparte tu racha sin revelar la solución.</p></section>
    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT} label="Publicidad" />
  </main>
}
