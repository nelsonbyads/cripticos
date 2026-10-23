import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cómo jugar' }

export default function HowToPlayPage() {
  return <main className="content-page"><p className="eyebrow">La mecánica</p><h1>Aprende a mirar dos veces.</h1><p className="lead">Cada enigma parece una frase normal, pero contiene una definición y las instrucciones para construir la misma palabra.</p><section className="steps"><article><span>01</span><h2>Encuentra la definición</h2><p>Puede estar al principio o al final. Describe la respuesta de manera directa o lateral.</p></article><article><span>02</span><h2>Detecta el mecanismo</h2><p>Palabras como “revuelto”, “sin cabeza” o “escondido” indican qué hacer con las letras.</p></article><article><span>03</span><h2>Comprueba la respuesta</h2><p>La solución debe encajar simultáneamente con la definición y con el juego de palabras.</p></article></section></main>
}
