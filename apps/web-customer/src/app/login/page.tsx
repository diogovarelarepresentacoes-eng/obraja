'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const submitting = useRef(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting.current) return
    setError(null)

    if (!form.email.trim()) return setError('Informe o e-mail')
    if (!form.password) return setError('Informe a senha')

    submitting.current = true
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim().toLowerCase(), password: form.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        const msg = data?.message ?? 'Credenciais inválidas'
        setError(Array.isArray(msg) ? msg.join(' ') : String(msg))
        return
      }

      if (data?.data?.accessToken) {
        localStorage.setItem('obraja_token', data.data.accessToken)
        localStorage.setItem('obraja_user', JSON.stringify(data.data.user ?? {}))
      }

      router.push('/home')
    } catch {
      setError('Não foi possível conectar ao servidor. Tente novamente.')
    } finally {
      setLoading(false)
      submitting.current = false
    }
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
          <Link href="/" aria-label="Página inicial ObraJá">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-semibold px-4 py-2 rounded-xl text-white"
            style={{ background: '#F05A28' }}
          >
            Cadastre-se
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          <h1 className="text-2xl font-black text-center mb-2" style={{ color: '#1A1A1A' }}>
            Entrar na sua conta
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: '#9E9E9E' }}>
            Bem-vindo de volta ao ObraJá
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="seu@email.com"
                aria-describedby={error ? 'login-error' : undefined}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  background: '#F5F5F5',
                  border: `1.5px solid ${error ? '#EF4444' : '#E5E5E5'}`,
                  color: '#1A1A1A',
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-xs font-bold" style={{ color: '#1A1A1A' }}>
                  Senha
                </label>
                <Link href="/forgot-password" className="text-xs font-medium" style={{ color: '#F05A28' }}>
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Sua senha"
                  aria-describedby={error ? 'login-error' : undefined}
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    background: '#F5F5F5',
                    border: `1.5px solid ${error ? '#EF4444' : '#E5E5E5'}`,
                    color: '#1A1A1A',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: '#9E9E9E' }}
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
                id="login-error"
                role="alert"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all mt-2"
              style={{
                background: loading ? '#CC4010' : 'linear-gradient(135deg, #F05A28, #CC4010)',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(240,90,40,0.35)',
                opacity: loading ? 0.8 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Entrando...
                </span>
              ) : (
                'Entrar →'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#9E9E9E' }}>
          Ainda não possui cadastro?{' '}
          <Link href="/cadastro" className="font-bold" style={{ color: '#F05A28' }}>
            Solicitar cadastro
          </Link>
        </p>
      </main>
    </div>
  )
}
