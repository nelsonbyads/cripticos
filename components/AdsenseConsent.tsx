'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'enigmads_ads_consent'

export function AdsenseConsent() {
  const [choice, setChoice] = useState<'accepted' | 'rejected' | null>(null)
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  useEffect(() => { setChoice(localStorage.getItem(CONSENT_KEY) as typeof choice) }, [])
  const decide = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, value)
    setChoice(value)
    window.dispatchEvent(new CustomEvent('enigmads-consent', { detail: value }))
  }
  return <>
    {client && choice === 'accepted' && <Script id="adsense-script" async strategy="afterInteractive" crossOrigin="anonymous" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} />}
    {choice === null && <aside className="consent-banner" aria-label="Preferencias de privacidad"><div><strong>Tu privacidad importa</strong><p>Usamos almacenamiento local para guardar tu progreso. Con tu permiso, Google podrá mostrar publicidad para financiar EnigmAds.</p></div><div><button onClick={() => decide('rejected')}>Solo esenciales</button><button className="primary-button" onClick={() => decide('accepted')}>Aceptar publicidad</button></div></aside>}
  </>
}
