import { requireAdmin } from '@/lib/auth'
import { getAllChallenges } from '@/lib/challenges'
import { ChallengeForm } from '@/components/admin/ChallengeForm'

export default async function NewChallengePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdmin()
  const list = await getAllChallenges()
  const { error } = await searchParams
  return <main className="admin-page"><header className="editor-header"><div><p className="eyebrow">Nuevo contenido</p><h1>Crear enigma</h1></div></header><ChallengeForm nextNumber={Math.max(0, ...list.map((item) => item.number)) + 1} error={error} /></main>
}
