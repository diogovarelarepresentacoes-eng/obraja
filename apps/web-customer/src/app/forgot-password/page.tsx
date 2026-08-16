'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const submitting = useRef(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting.current || !email.trim()) return
    setError(null)
    submitting.current = true
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const msg = data?.message ?? 'Não foi possível processar sua solicitação'
        setError(Array.isArray(msg) ? msg.join(' ') : String(msg))
        return
      }

      setSent(true)
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
              Suporte e segurança
            </p>
            <h2 className="text-4xl font-black leading-tight text-white">
              Sua conta está<br />sempre protegida<br />com a gente.
            </h2>
          </div>

          {/* Security features */}
          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                ),
                title: 'Link seguro por e-mail',
                desc: 'O link de recuperação expira em 30 minutos por segurança',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                ),
                title: 'Dados protegidos',
                desc: 'Nunca compartilhamos suas informações com terceiros',
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                ),
                title: 'Suporte via e-mail',
                desc: 'Nossa equipe responde em até 2 horas úteis',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(240,90,40,0.15)', color: '#F05A28' }}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-black text-sm text-white">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-sm" style={{ color: '#9E9E9E' }}>
            Precisa de ajuda? Fale com nosso suporte.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile-only top nav */}
        <nav className="flex items-center justify-between px-6 py-4 lg:hidden">
          <Link href="/" aria-label="Página inicial">
            <span className="text-xl font-black tracking-tight">
              <span style={{ color: '#1A1A1A' }}>Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
        </nav>

        {/* Desktop-only top nav */}
        <nav className="hidden lg:flex items-center justify-end px-10 py-6">
          <Link
            href="/login"
            className="text-sm font-bold px-5 py-2.5 rounded-xl"
            style={{ color: '#1A1A1A', border: '1.5px solid #E8E8E8' }}
          >
            ← Voltar ao login
          </Link>
        </nav>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-16 xl:px-24 max-w-lg mx-auto w-full">
          {sent ? (
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(240,90,40,0.12), rgba(204,64,16,0.08))' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h1 className="text-2xl font-black mb-3" style={{ color: '#1A1A1A' }}>
                Verifique seu e-mail
              </h1>
              <p className="text-sm leading-relaxed mb-2" style={{ color: '#9E9E9E' }}>
                Se existir uma conta associada ao endereço
              </p>
              <p className="text-sm font-bold mb-4" style={{ color: '#1A1A1A' }}>
                {email}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                você receberá um link para redefinir sua senha. Verifique também a caixa de spam.
              </p>

              <div
                className="mt-8 p-4 rounded-2xl text-left"
                style={{ background: '#F5F5F5', border: '1.5px solid #E8E8E8' }}
              >
                <p className="text-xs font-bold mb-1" style={{ color: '#1A1A1A' }}>Dica de segurança</p>
                <p className="text-xs" style={{ color: '#9E9E9E' }}>
                  O link expira em 30 minutos. Nunca compartilhe o link de recuperação com ninguém.
                </p>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold px-6 py-3 rounded-2xl text-white"
                style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)', boxShadow: '0 8px 28px rgba(240,90,40,0.4)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Voltar para o login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-black mb-2" style={{ color: '#1A1A1A' }}>
                  Recuperar senha
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                  Digite seu e-mail e enviaremos um link para você criar uma nova senha.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold mb-2" style={{ color: '#1A1A1A' }}>
                    E-mail cadastrado
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError(null)
                    }}
                    required
                    autoComplete="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all"
                    style={{
                      background: '#F5F5F5',
                      border: `1.5px solid ${error ? '#EF4444' : '#E8E8E8'}`,
                      color: '#1A1A1A',
                    }}
                  />
                </div>

                {error && (
                  <div
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
                  className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all"
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
                      Enviando...
                    </span>
                  ) : (
                    'Enviar link de recuperação →'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{ color: '#9E9E9E' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Voltar para o login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
