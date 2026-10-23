import type { Challenge } from '@/lib/db/schema'
import { saveChallengeAction } from '@/app/admin/actions'

export function ChallengeForm({ challenge, nextNumber, error }: { challenge?: Challenge; nextNumber: number; error?: string }) {
  const localDate = challenge?.publishAt ? new Date(challenge.publishAt.getTime() - challenge.publishAt.getTimezoneOffset() * 60_000).toISOString().slice(0, 16) : ''
  return <form action={saveChallengeAction} className="editor-form">
    {challenge && <input type="hidden" name="id" value={challenge.id} />}
    {error && <div className="form-error full">{error}</div>}
    <section className="editor-main"><div className="field-row"><label>Número<input name="number" type="number" min="1" required defaultValue={challenge?.number ?? nextNumber} /></label><label>Estado<select name="status" defaultValue={challenge?.status ?? 'draft'}><option value="draft">Borrador</option><option value="scheduled">Programado</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label></div>
      <label>Pista principal<textarea name="clue" required minLength={8} rows={3} defaultValue={challenge?.clue} placeholder="Escribe una pista con dos niveles de lectura…" /></label>
      <label>Respuesta<input name="answer" required defaultValue={challenge?.answer} placeholder="PALABRA" /></label>
      <div className="field-row"><label>Definición<input name="definition" required defaultValue={challenge?.definition} /></label><label>Técnica<input name="technique" required defaultValue={challenge?.technique} placeholder="Anagrama" /></label></div>
      <label>Pista del mecanismo<textarea name="mechanismHint" required rows={3} defaultValue={challenge?.mechanismHint} /></label>
      <label>Explicación final<textarea name="explanation" required minLength={10} rows={6} defaultValue={challenge?.explanation} /></label>
    </section>
    <aside className="editor-side"><h2>Publicación</h2><label>Fecha y hora<input type="datetime-local" name="publishAt" defaultValue={localDate} /></label><label>Slug<input name="slug" defaultValue={challenge?.slug} placeholder="Se genera automáticamente" /></label><label>Autor<input name="author" defaultValue={challenge?.author ?? ''} placeholder="Opcional" /></label><div className="editor-note"><strong>Antes de publicar</strong><p>Comprueba la ortografía, el número de letras, la definición y que la explicación no deje dudas.</p></div><button className="primary-button" type="submit">Guardar enigma</button></aside>
  </form>
}
