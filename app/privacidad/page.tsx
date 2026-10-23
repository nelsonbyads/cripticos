import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacidad' }

export default function PrivacyPage() {
  return <main className="legal-page"><p className="eyebrow">Información legal</p><h1>Política de privacidad</h1><p className="updated">Borrador para revisión legal · octubre de 2026</p><h2>Datos que utilizamos</h2><p>EnigmAds guarda el progreso del juego localmente en tu dispositivo. El panel administrativo procesa únicamente las credenciales de las personas autorizadas.</p><h2>Publicidad</h2><p>Con tu consentimiento, Google AdSense puede tratar identificadores, dirección IP y datos de navegación para seleccionar, medir y limitar anuncios. Puedes rechazar la publicidad desde el aviso de consentimiento.</p><h2>Responsable y contacto</h2><p>Antes del lanzamiento se debe completar esta sección con la razón social, domicilio, correo de privacidad y plazos de conservación aplicables.</p><h2>Tus derechos</h2><p>Puedes solicitar acceso, rectificación o eliminación de tus datos mediante el canal de privacidad que se publique antes del lanzamiento.</p></main>
}
