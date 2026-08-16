'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const submitting = useRef(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting.current || !email.trim()) return
    submitting.current = true
    setLoading(true)
    // TODO: POST /api/v1/auth/forgot-password — endpoint a ser implementado no backend
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
    submitting.current = false
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center" style={{ height: '64px' }}>
          <Link href="/" aria-label="Página inicial">
            <span className="text-xl font-black tracking-tight">
              <span className="text-white">Obra</span>
              <span style={{ color: '#F05A28' }}>Já</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-10">
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#FFF7ED' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h1 className="text-xl font-black mb-3" style={{ color: '#1A1A1A' }}>Verifique seu e-mail</h1>
              <p className="text-sm leading-relaxed" style={{ color: '#9E9E9E' }}>
                Se existir uma conta associada a este e-mail, você receberá um link para redefinir sua senha.
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 text-sm font-bold"
                style={{ color: '#F05A28' }}
              >
                ← Voltar para o login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-black mb-2" style={{ color: '#1A1A1A' }}>Recuperar senha</h1>
              <p className="text-sm mb-8" style={{ color: '#9E9E9E' }}>
                Digite seu e-mail e enviaremos um link para redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #F05A28, #CC4010)',
                    boxShadow: loading ? 'none' : '0 8px 24px rgba(240,90,40,0.35)',
                    opacity: loading ? 0.8 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-sm font-medium" style={{ color: '#9E9E9E' }}>
                  ← Voltar para o login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
