import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ChallengeForm } from '@/components/admin/ChallengeForm'
import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'

export default async function EditChallengePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id)).limit(1)
  if (!challenge) notFound()
  const { error } = await searchParams
  return <main className="admin-page"><header className="editor-header"><div><p className="eyebrow">Enigma #{challenge.number}</p><h1>Editar contenido</h1></div></header><ChallengeForm challenge={challenge} nextNumber={challenge.number} error={error} /></main>
}
