'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const submitting = useRef(false)

  function clearError() {
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting.current) return
    setError(null)

    if (!email.trim()) return setError('Informe o e-mail')
    if (!password) return setError('Informe a senha')

    submitting.current = true
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = data?.message ?? 'Credenciais inválidas'
        setError(Array.isArray(msg) ? msg.join(' ') : String(msg))
        return
      }

      const user = data?.data?.user
      const token = data?.data?.accessToken

      // Backend must enforce PLATFORM_ADMIN — frontend only validates for UX
      if (user?.role !== 'admin') {
        setError('Acesso negado. Apenas administradores da plataforma podem entrar aqui.')
        return
      }

      if (token) {
        sessionStorage.setItem('obraja_admin_token', token)
        sessionStorage.setItem('obraja_admin_user', JSON.stringify(user))
      }

      router.push('/dashboard')
    } catch {
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.')
    } finally {
      setLoading(false)
      submitting.current = false
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-3xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
          <p className="text-[#9E9E9E] text-sm mt-2 font-medium uppercase tracking-widest">
            Painel Administrativo
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-black text-[#1A1A1A] mb-1">Acesso restrito</h1>
          <p className="text-[#9E9E9E] text-sm mb-8">Entre com suas credenciais de administrador</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError() }}
                placeholder="admin@obraja.com.br"
                autoComplete="email"
                aria-describedby={error ? 'admin-login-error' : undefined}
                className="w-full h-11 px-4 rounded-xl text-sm text-[#1A1A1A] focus:outline-none transition-colors"
                style={{ border: `2px solid ${error ? '#EF4444' : '#E5E5E5'}` }}
                onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = '#F05A28' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#EF4444' : '#E5E5E5' }}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError() }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-describedby={error ? 'admin-login-error' : undefined}
                  className="w-full h-11 px-4 pr-11 rounded-xl text-sm text-[#1A1A1A] focus:outline-none transition-colors"
                  style={{ border: `2px solid ${error ? '#EF4444' : '#E5E5E5'}` }}
                  onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = '#F05A28' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#EF4444' : '#E5E5E5' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                id="admin-login-error"
                role="alert"
                className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-medium"
              >
                <svg className="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full h-11 font-bold rounded-xl transition-all active:scale-95 text-white"
              style={{
                background: loading ? '#CC4010' : '#F05A28',
                opacity: loading ? 0.8 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Verificando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#555] text-xs mt-8">
          ObraJá © 2026 — Painel Administrativo
        </p>
      </div>
    </div>
  )
}
