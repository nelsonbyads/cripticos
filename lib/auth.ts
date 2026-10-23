import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from './db'
import { adminUsers } from './db/schema'

const COOKIE_NAME = 'enigmads_admin'

function secret() {
  const value = process.env.SESSION_SECRET
  if (!value || value.length < 32) throw new Error('SESSION_SECRET debe tener al menos 32 caracteres')
  return new TextEncoder().encode(value)
}

export async function authenticate(email: string, password: string) {
  const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email.toLowerCase())).limit(1)
  if (!admin?.active || !(await compare(password, admin.passwordHash))) return null
  return { id: admin.id, email: admin.email, name: admin.name }
}

export async function createSession(admin: { id: string; email: string; name: string }) {
  const token = await new SignJWT(admin).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('12h').sign(secret())
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
}

export async function clearSession() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    return payload as { id: string; email: string; name: string }
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const admin = await getSession()
  if (!admin) redirect('/admin/login')
  return admin
}
