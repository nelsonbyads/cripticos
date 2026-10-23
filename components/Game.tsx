'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { normalizeAnswer } from '@/lib/text'

type Challenge = { id: string; number: number; slug: string; clue: string; answerLength: number; publishAt: string | null }
type HintData = { definition?: string; technique?: string; mechanismHint?: string }
type Saved = { solved: boolean; attempts: number; hints: number[]; revealed: Record<number, string>; answer?: string; explanation?: string }

const blank = (): Saved => ({ solved: false, attempts: 0, hints: [], revealed: {} })

export function Game({ challenge }: { challenge: Challenge }) {
  const key = `enigmads:${challenge.id}`
  const [saved, setSaved] = useState<Saved>(blank)
  const [letters, setLetters] = useState<string[]>(() => Array.from({ length: challenge.answerLength }, () => ''))
  const [hydrated, setHydrated] = useState(false)
  const [hintData, setHintData] = useState<HintData>({})
  const [message, setMessage] = useState('')
  const [modal, setModal] = useState(false)
  const [explanation, setExplanation] = useState(saved.explanation ?? '')
  const [answer, setAnswer] = useState(saved.answer ?? '')
  const [copied, setCopied] = useState(false)
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const helpCount = saved.hints.length + Object.keys(saved.revealed).length

  useEffect(() => {
    let restored = blank()
    try { restored = JSON.parse(localStorage.getItem(key) ?? 'null') ?? blank() } catch { /* Se usa un progreso vacío. */ }
    setSaved(restored)
    setLetters(restored.solved && restored.answer
      ? normalizeAnswer(restored.answer).split('')
      : Array.from({ length: challenge.answerLength }, (_, index) => restored.revealed[index] ?? ''))
    setAnswer(restored.answer ?? '')
    setExplanation(restored.explanation ?? '')
    setHydrated(true)
  }, [challenge.answerLength, key])

  useEffect(() => { if (hydrated) localStorage.setItem(key, JSON.stringify(saved)) }, [hydrated, key, saved])

  const submit = async (candidate = letters) => {
    if (candidate.some((value) => !value) || saved.solved) return
    const response = await fetch(`/api/challenges/${challenge.id}/check`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: candidate.join('') }) })
    const result = await response.json()
    if (!result.correct) {
      setSaved((current) => ({ ...current, attempts: current.attempts + 1 }))
      setMessage('Todavía no encaja. Prueba otra lectura.')
      return
    }
    setSaved((current) => ({ ...current, solved: true, attempts: current.attempts + 1, answer: result.answer, explanation: result.explanation }))
    setAnswer(result.answer)
    setExplanation(result.explanation)
    setLetters(normalizeAnswer(result.answer).split(''))
    setMessage('¡Enigma resuelto!')
  }

  const change = (index: number, raw: string) => {
    const next = [...letters]
    next[index] = normalizeAnswer(raw).slice(-1)
    setLetters(next)
    setMessage('')
    if (next[index]) refs.current[index + 1]?.focus()
    if (next.every(Boolean)) void submit(next)
  }

  const requestHint = async (type: 'definition' | 'mechanism' | 'letter') => {
    const response = await fetch(`/api/challenges/${challenge.id}/hint?type=${type}&revealed=${Object.keys(saved.revealed).join(',')}`)
    const data = await response.json()
    if (type === 'letter') {
      const next = [...letters]
      next[data.position] = data.letter
      setLetters(next)
      setSaved((current) => ({ ...current, revealed: { ...current.revealed, [data.position]: data.letter } }))
      if (next.every(Boolean)) void submit(next)
      return
    }
    const index = type === 'definition' ? 0 : 1
    setHintData((current) => ({ ...current, ...data }))
    setSaved((current) => ({ ...current, hints: current.hints.includes(index) ? current.hints : [...current.hints, index] }))
  }

  const stats = useMemo(() => `${helpCount ? `${helpCount} ayuda${helpCount === 1 ? '' : 's'}` : 'Sin ayudas'} · ${saved.attempts} intento${saved.attempts === 1 ? '' : 's'}`, [helpCount, saved.attempts])
  const share = async () => {
    const text = `EnigmAds #${challenge.number}\n${helpCount ? `💡 ${helpCount} ayudas` : '🎯 Sin ayudas'}\n¿Puedes resolverlo?`
    if (navigator.share) { try { await navigator.share({ text }); return } catch { /* mostrar copia */ } }
    await navigator.clipboard.writeText(text); setCopied(true)
  }

  return <>
    <section className="puzzle-card">
      <div className="card-meta"><span>El enigma de hoy</span><span>{challenge.answerLength} letras</span></div>
      <blockquote>“{challenge.clue}”</blockquote>
      <div className="letter-row">{letters.map((letter, index) => (
        <input key={index} ref={(node) => { refs.current[index] = node }} aria-label={`Letra ${index + 1}`} value={letter} maxLength={2} readOnly={saved.solved || Boolean(saved.revealed[index])} className={saved.solved ? 'correct' : saved.revealed[index] ? 'revealed' : ''} onChange={(event) => change(index, event.target.value)} onKeyDown={(event) => {
          if (event.key === 'Backspace' && !letter) refs.current[index - 1]?.focus()
          if (event.key === 'Enter') void submit()
        }} />
      ))}</div>
      <p className={`feedback ${saved.solved ? 'success' : ''}`} aria-live="polite">{message}</p>
      {!saved.solved && <button className="text-button" onClick={() => setModal(true)}>Necesito una pista ↗</button>}
    </section>
    {saved.solved && <section className="result-card"><div><p className="eyebrow">Enigma abierto</p><h2>{helpCount ? '¡Descifrado!' : '¡Impecable!'}</h2></div><strong className="answer-reveal">{answer || 'RESUELTO'}</strong><p>{explanation || 'Ya resolviste este reto en este dispositivo.'}</p><div className="result-actions"><span>{stats}</span><button onClick={share}>{copied ? 'Copiado ✓' : 'Compartir'}</button></div></section>}
    {modal && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModal(false)}><section className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={() => setModal(false)} aria-label="Cerrar">×</button><p className="eyebrow">Mesa de ayuda</p><h2>¿Cuánto quieres revelar?</h2><div className="hint-list">
      <button onClick={() => void requestHint('definition')}><span><strong>La definición</strong><small>{hintData.definition ?? 'Qué parte describe la solución'}</small></span><b>{saved.hints.includes(0) ? '✓' : '+1'}</b></button>
      <button onClick={() => void requestHint('mechanism')}><span><strong>El mecanismo</strong><small>{hintData.mechanismHint ? `${hintData.technique}: ${hintData.mechanismHint}` : 'Qué operación esconde la frase'}</small></span><b>{saved.hints.includes(1) ? '✓' : '+1'}</b></button>
      <button onClick={() => void requestHint('letter')}><span><strong>Una letra</strong><small>Aparece en su posición correcta</small></span><b>{Object.keys(saved.revealed).length}/{challenge.answerLength}</b></button>
    </div></section></div>}
  </>
}
