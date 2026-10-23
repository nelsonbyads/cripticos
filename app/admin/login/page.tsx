import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { loginAction } from '../actions'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getSession()) redirect('/admin')
  const { error } = await searchParams
  return <main className="login-page"><form action={loginAction} className="login-card"><div className="admin-logo">E</div><p className="eyebrow">Acceso privado</p><h1>Administración</h1><p>Gestiona el calendario editorial de EnigmAds.</p>{error && <div className="form-error">{error}</div>}<label>Correo electrónico<input type="email" name="email" required autoComplete="email" /></label><label>Contraseña<input type="password" name="password" required autoComplete="current-password" /></label><button className="primary-button" type="submit">Ingresar al panel</button></form></main>
}
