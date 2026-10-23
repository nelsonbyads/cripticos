import type { Metadata } from 'next'
import Link from 'next/link'
import { AdsenseConsent } from '@/components/AdsenseConsent'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'EnigmAds — El enigma diario', template: '%s | EnigmAds' },
  description: 'Un reto de palabras nuevo cada día. Descifra la pista, protege tu racha y comparte el resultado.',
  openGraph: { type: 'website', locale: 'es_419', siteName: 'EnigmAds' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-419">
      <body>
        <AdsenseConsent />
        <header className="site-header">
          <Link className="wordmark" href="/"><span>E</span>ENIGM<strong>ADS</strong></Link>
          <nav aria-label="Navegación principal"><Link href="/">Hoy</Link><Link href="/archivo">Archivo</Link><Link href="/como-jugar">Cómo jugar</Link></nav>
        </header>
        {children}
        <footer className="site-footer"><Link className="wordmark inverse" href="/"><span>E</span>ENIGM<strong>ADS</strong></Link><p>Un pequeño misterio para cada día.</p><nav><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link><Link href="/admin">Administrar</Link></nav></footer>
      </body>
    </html>
  )
}
