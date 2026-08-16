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
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white border border-[#E5E5E5] rounded-xl p-10 shadow-sm">

        {/* Logo */}
        <Link href="/" className="inline-block mb-8" aria-label="Página inicial ObraJá">
          <span className="text-xl font-black tracking-tight">
            <span className="text-[#1A1A1A]">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
        </Link>

        {sent ? (
          <div className="text-center">
            {/* Check icon */}
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className="text-xl font-black text-[#1A1A1A] mb-2">E-mail enviado</h1>
            <p className="text-sm text-[#9E9E9E] leading-relaxed mb-1">
              Enviamos um link de recuperação para
            </p>
            <p className="text-sm font-bold text-[#1A1A1A] mb-6 break-all">{email}</p>
            <p className="text-sm text-[#9E9E9E] leading-relaxed mb-8">
              Verifique sua caixa de entrada e também a pasta de spam. O link expira em 30 minutos.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold text-white bg-[#F05A28] hover:bg-[#CC4010] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Voltar ao login
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-xl font-black text-[#1A1A1A] mb-2">Recuperar acesso</h1>
              <p className="text-sm text-[#9E9E9E] leading-relaxed">
                Digite seu e-mail e enviaremos um link para você criar uma nova senha.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
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
                  className="w-full px-4 py-3 rounded-lg text-sm bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/10 transition-colors"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-[#DC2626]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="w-full py-3 rounded-lg text-sm font-bold text-white bg-[#F05A28] hover:bg-[#CC4010] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Enviar instruções'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#E5E5E5] text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Lembrei minha senha — Entrar
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
