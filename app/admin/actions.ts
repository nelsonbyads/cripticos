'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { authenticate, clearSession, createSession, requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { challenges } from '@/lib/db/schema'
import { slugify } from '@/lib/text'

const challengeInput = z.object({
  id: z.string().uuid().optional().or(z.literal('')),
  number: z.coerce.number().int().positive(),
  slug: z.string().max(160).optional(),
  clue: z.string().min(8).max(500),
  answer: z.string().min(1).max(100),
  definition: z.string().min(1).max(500),
  technique: z.string().min(2).max(80),
  mechanismHint: z.string().min(4).max(700),
  explanation: z.string().min(10).max(3000),
  author: z.string().max(120).optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']),
  publishAt: z.string().optional(),
})

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const admin = await authenticate(email, password)
  if (!admin) redirect('/admin/login?error=Credenciales%20incorrectas')
  await createSession(admin)
  redirect('/admin')
}

export async function logoutAction() {
  await clearSession()
  redirect('/admin/login')
}

export async function saveChallengeAction(formData: FormData) {
  await requireAdmin()
  const raw = Object.fromEntries(formData.entries())
  const parsed = challengeInput.safeParse(raw)
  if (!parsed.success) redirect(`/admin/retos/${raw.id || 'nuevo'}?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? 'Datos inválidos')}`)
  const value = parsed.data
  const publishAt = value.publishAt ? new Date(value.publishAt) : null
  if ((value.status === 'scheduled' || value.status === 'published') && !publishAt) redirect(`/admin/retos/${value.id || 'nuevo'}?error=La%20fecha%20de%20publicación%20es%20obligatoria`)
  const payload = {
    number: value.number,
    slug: slugify(value.slug || `enigma-${value.number}-${value.answer}`),
    clue: value.clue.trim(), answer: value.answer.trim().toLocaleUpperCase('es'), definition: value.definition.trim(),
    technique: value.technique.trim(), mechanismHint: value.mechanismHint.trim(), explanation: value.explanation.trim(),
    author: value.author?.trim() || null, status: value.status, publishAt, updatedAt: new Date(),
  }
  if (value.id) await db.update(challenges).set(payload).where(eq(challenges.id, value.id))
  else await db.insert(challenges).values(payload)
  revalidatePath('/')
  revalidatePath('/archivo')
  revalidatePath('/admin')
  redirect('/admin?saved=1')
}

export async function archiveChallengeAction(formData: FormData) {
  await requireAdmin()
  const id = z.string().uuid().parse(formData.get('id'))
  await db.update(challenges).set({ status: 'archived', updatedAt: new Date() }).where(eq(challenges.id, id))
  revalidatePath('/')
  revalidatePath('/archivo')
  revalidatePath('/admin')
}
