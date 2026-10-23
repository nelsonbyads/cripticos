export type Technique = 'Anagrama' | 'Doble definición' | 'Palabra oculta' | 'Charada' | 'Sustracción'

export interface Puzzle {
  id: number
  clue: string
  answer: string
  definition: string
  technique: Technique
  mechanism: string
  explanation: string
}

export const LAUNCH_DATE = '2026-10-16'

// Retos originales de demostración. El contenido puede sustituirse por un CMS o una API.
export const puzzles: Puzzle[] = [
  {
    id: 1,
    clue: 'Capital que también sirve para pulir',
    answer: 'LIMA',
    definition: 'Capital',
    technique: 'Doble definición',
    mechanism: 'Busca una palabra con dos significados distintos.',
    explanation: 'LIMA es la capital de Perú y también una herramienta para pulir superficies.',
  },
  {
    id: 2,
    clue: 'Una fruta espera pacientemente escondida',
    answer: 'PERA',
    definition: 'Una fruta',
    technique: 'Palabra oculta',
    mechanism: 'La respuesta aparece seguida dentro de otra palabra.',
    explanation: 'La palabra esPERA contiene PERA sin cambiar el orden de sus letras.',
  },
  {
    id: 3,
    clue: 'Actor confundido termina por cortar',
    answer: 'CORTA',
    definition: 'cortar',
    technique: 'Anagrama',
    mechanism: '“Confundido” pide reordenar las letras de una palabra cercana.',
    explanation: 'Las letras de ACTOR, confundidas, forman CORTA.',
  },
  {
    id: 4,
    clue: 'Una nota con el norte da tratamiento respetuoso',
    answer: 'DON',
    definition: 'tratamiento respetuoso',
    technique: 'Charada',
    mechanism: 'Une dos piezas breves en el orden en que aparecen.',
    explanation: 'DO es una nota musical y N es la abreviatura de norte: DO + N forma DON, un tratamiento respetuoso.',
  },
  {
    id: 5,
    clue: 'El felino que levanta el automóvil',
    answer: 'GATO',
    definition: 'El felino',
    technique: 'Doble definición',
    mechanism: 'La misma palabra designa un animal y una herramienta.',
    explanation: 'GATO es el felino y también la herramienta con la que se eleva un automóvil.',
  },
  {
    id: 6,
    clue: 'El planeta aparece discretamente en el martes',
    answer: 'MARTE',
    definition: 'El planeta',
    technique: 'Palabra oculta',
    mechanism: 'Ignora dónde termina una palabra y empieza la siguiente idea.',
    explanation: 'MARTE aparece al comienzo de “martes”; el indicador lateral es “aparece discretamente”.',
  },
  {
    id: 7,
    clue: 'Saco revuelto resulta ser una cosa',
    answer: 'COSA',
    definition: 'una cosa',
    technique: 'Anagrama',
    mechanism: '“Revuelto” indica que hay que cambiar el orden de las letras.',
    explanation: 'SACO revuelto produce COSA.',
  },
  {
    id: 8,
    clue: 'Calor pierde la cabeza y queda una fragancia',
    answer: 'OLOR',
    definition: 'una fragancia',
    technique: 'Sustracción',
    mechanism: '“Pierde la cabeza” elimina la primera letra.',
    explanation: 'CALOR sin su primera letra, la C, deja OLOR.',
  },
]

export const normalize = (value: string) =>
  value
    .toLocaleUpperCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-ZÑ]/g, '')

export const puzzleDate = (index: number) => {
  const date = new Date(`${LAUNCH_DATE}T12:00:00`)
  date.setDate(date.getDate() + index)
  return date
}

export const todayIndex = () => {
  const launch = new Date(`${LAUNCH_DATE}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.max(0, Math.min(puzzles.length - 1, Math.floor((today.getTime() - launch.getTime()) / 86_400_000)))
}
