import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-surface">{children}<div className="admin-back"><Link href="/">← Volver a EnigmAds</Link></div></div>
}
