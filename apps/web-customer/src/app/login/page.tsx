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
    <div className="min-h-screen flex">
      {/* Left panel — brand (hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: '#1A1A1A' }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '480px',
            height: '480px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(240,90,40,0.22) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Top logo */}
        <div className="relative z-10">
          <Link href="/" aria-label="Página inicial ObraJá">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#F05A28' }}>
              O marketplace da construção civil
            </p>
            <h2 className="text-4xl font-black leading-tight text-white">
              Tudo que sua obra<br />precisa, entregue<br />na hora certa.
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Lojas parceiras' },
              { value: '50k', label: 'Produtos' },
              { value: '10k', label: 'Clientes ativos' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-2xl font-black" style={{ color: '#F05A28' }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: '#9E9E9E' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            Materiais de construção com delivery rápido e preço justo.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile-only top nav */}
        <nav className="flex items-center justify-between px-6 py-4 lg:hidden">
          <Link href="/" aria-label="Página inicial ObraJá">
            <span className="text-xl font-black tracking-tight">
              <span style={{ color: '#1A1A1A' }}>Obra</span>
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
        </nav>

        {/* Desktop-only top nav */}
        <nav className="hidden lg:flex items-center justify-end px-10 py-6">
          <span className="text-sm mr-3" style={{ color: '#9E9E9E' }}>
            Ainda não tem conta?
          </span>
          <Link
            href="/cadastro"
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)', boxShadow: '0 4px 14px rgba(240,90,40,0.3)' }}
          >
            Cadastre-se grátis
          </Link>
        </nav>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-16 xl:px-24 max-w-lg mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-black mb-2" style={{ color: '#1A1A1A' }}>
              Bem-vindo de volta
            </h1>
            <p className="text-sm" style={{ color: '#9E9E9E' }}>
              Acesse sua conta ObraJá e continue comprando
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
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
                className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
                style={{
                  background: '#F5F5F5',
                  border: `1.5px solid ${error ? '#EF4444' : '#E8E8E8'}`,
                  color: '#1A1A1A',
                }}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold" style={{ color: '#1A1A1A' }}>
                  Senha
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold" style={{ color: '#F05A28' }}>
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
                  className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: '#F5F5F5',
                    border: `1.5px solid ${error ? '#EF4444' : '#E8E8E8'}`,
                    color: '#1A1A1A',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1"
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
                className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl text-sm font-medium"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
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
                boxShadow: loading ? 'none' : '0 8px 28px rgba(240,90,40,0.4)',
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
                'Entrar na conta →'
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-8" style={{ color: '#9E9E9E' }}>
            Ainda não possui cadastro?{' '}
            <Link href="/cadastro" className="font-bold" style={{ color: '#F05A28' }}>
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
