import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublicArchive } from '@/lib/challenges'

export const metadata: Metadata = { title: 'Archivo de enigmas' }
export const dynamic = 'force-dynamic'

export default async function ArchivePage() {
  const list = await getPublicArchive()
  return <main className="content-page"><p className="eyebrow">Todos los retos</p><h1>Archivo de enigmas</h1><p className="lead">Una biblioteca para ejercitar la mirada. Elige una fecha y vuelve a jugar.</p><div className="archive-grid">{list.map((item) => <Link href={`/reto/${item.slug}`} key={item.id}><span>#{String(item.number).padStart(2, '0')}</span><strong>{item.publishAt?.toLocaleDateString('es-419', { day: 'numeric', month: 'long' }) ?? 'Sin fecha'}</strong><p>{item.clue}</p><b>Resolver →</b></Link>)}</div></main>
}
