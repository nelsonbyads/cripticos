import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { getAllChallenges } from '@/lib/challenges'
import { archiveChallengeAction, logoutAction } from './actions'

const labels = { draft: 'Borrador', scheduled: 'Programado', published: 'Publicado', archived: 'Archivado' }

export const dynamic = 'force-dynamic'

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const admin = await requireAdmin()
  const list = await getAllChallenges()
  const { saved } = await searchParams
  return <main className="admin-page"><header className="admin-header"><div><p className="eyebrow">EnigmAds Studio</p><h1>Calendario editorial</h1><p>Hola, {admin.name}. Tienes {list.filter((item) => item.status === 'scheduled').length} enigmas programados.</p></div><div className="admin-actions"><form action={logoutAction}><button className="secondary-button">Cerrar sesión</button></form><Link className="primary-button" href="/admin/retos/nuevo">+ Nuevo enigma</Link></div></header>{saved && <div className="success-banner">Los cambios se guardaron correctamente.</div>}<section className="admin-metrics"><article><strong>{list.length}</strong><span>Total</span></article><article><strong>{list.filter((item) => item.status === 'draft').length}</strong><span>Borradores</span></article><article><strong>{list.filter((item) => item.status === 'scheduled').length}</strong><span>Programados</span></article><article><strong>{list.filter((item) => item.status === 'published').length}</strong><span>Publicados</span></article></section><section className="challenge-table"><div className="table-head"><span>Reto</span><span>Publicación</span><span>Estado</span><span>Acciones</span></div>{list.map((item) => <article key={item.id}><div><b>#{item.number}</b><span>{item.clue}</span><small>{item.answer} · {item.technique}</small></div><time>{item.publishAt ? item.publishAt.toLocaleString('es-419', { dateStyle: 'medium', timeStyle: 'short' }) : 'Sin fecha'}</time><span className={`status-pill ${item.status}`}>{labels[item.status]}</span><div className="row-actions"><Link href={`/admin/retos/${item.id}`}>Editar</Link>{item.status !== 'archived' && <form action={archiveChallengeAction}><input type="hidden" name="id" value={item.id} /><button>Archivar</button></form>}</div></article>)}</section></main>
}
