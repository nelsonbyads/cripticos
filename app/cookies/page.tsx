import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cookies' }

export default function CookiesPage() {
  return <main className="legal-page"><p className="eyebrow">Información legal</p><h1>Política de cookies</h1><p className="updated">Borrador para revisión legal · octubre de 2026</p><h2>Almacenamiento esencial</h2><p>Utilizamos almacenamiento local para recordar los enigmas resueltos, las ayudas y tu decisión sobre publicidad. Estas funciones no crean perfiles publicitarios.</p><h2>Google AdSense</h2><p>Solo cargamos el script publicitario cuando eliges “Aceptar publicidad”. Google puede utilizar cookies o tecnologías equivalentes conforme a sus propias políticas.</p><h2>Cambiar la decisión</h2><p>Mientras incorporamos un centro completo de preferencias, puedes borrar los datos del sitio desde la configuración de tu navegador para volver a elegir.</p></main>
}
