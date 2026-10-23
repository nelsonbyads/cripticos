'use client'

import { useEffect, useState } from 'react'

declare global { interface Window { adsbygoogle?: Record<string, unknown>[] } }

export function AdSlot({ slot, label = 'Publicidad' }: { slot?: string; label?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  const [consent, setConsent] = useState(false)
  useEffect(() => {
    const sync = () => setConsent(localStorage.getItem('enigmads_ads_consent') === 'accepted')
    sync()
    window.addEventListener('enigmads-consent', sync)
    return () => window.removeEventListener('enigmads-consent', sync)
  }, [])
  useEffect(() => {
    if (!client || !slot || !consent) return
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch { /* AdSense reintenta al cargar. */ }
  }, [client, consent, slot])

  if (!client || !slot || !consent) return <aside className="ad-placeholder" aria-label="Espacio publicitario"><span>{label}</span><small>Espacio reservado para AdSense</small></aside>
  return <aside className="ad-container" aria-label={label}><span>{label}</span><ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></aside>
}
