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
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 bg-[#1A1A1A]">
        <Link href="/" aria-label="Página inicial ObraJá">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
        </Link>

        <div className="space-y-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[#F05A28]">
              O marketplace da construção civil
            </p>
            <h2 className="text-3xl font-black leading-snug text-white">
              Tudo que sua obra<br />precisa, entregue<br />na hora certa.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: 'Compra 100% segura',
                desc: 'Pagamento protegido e garantia em todas as compras',
              },
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
                title: 'Entrega rastreada',
                desc: 'Acompanhe em tempo real até a sua obra',
              },
              {
                icon: (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                ),
                title: 'Melhores preços',
                desc: 'Compare lojas e escolha o melhor custo-benefício',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-white/5 text-[#F05A28]">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-[#9E9E9E] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#9E9E9E]">
          Materiais de construção com delivery rápido e preço justo.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile nav */}
        <nav className="flex items-center justify-between px-6 py-4 lg:hidden border-b border-[#E5E5E5]">
          <Link href="/" aria-label="Página inicial ObraJá">
            <span className="text-xl font-black tracking-tight">
              <span className="text-[#1A1A1A]">Obra</span>
              <span className="text-[#F05A28]">Já</span>
            </span>
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white bg-[#F05A28] hover:bg-[#CC4010] transition-colors"
          >
            Cadastre-se
          </Link>
        </nav>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center justify-end px-10 py-5 border-b border-[#E5E5E5]">
          <span className="text-sm text-[#9E9E9E] mr-3">Ainda não tem conta?</span>
          <Link
            href="/cadastro"
            className="text-sm font-bold px-5 py-2 rounded-lg text-white bg-[#F05A28] hover:bg-[#CC4010] transition-colors"
          >
            Cadastre-se grátis
          </Link>
        </nav>

        {/* Form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">Bem-vindo de volta</h1>
            <p className="text-sm text-[#9E9E9E]">Acesse sua conta ObraJá e continue comprando</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
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
                className="w-full px-4 py-3 rounded-lg text-sm bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/10 transition-colors"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A]">
                  Senha
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-[#F05A28] hover:text-[#CC4010] transition-colors">
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
                  className="w-full px-4 py-3 pr-12 rounded-lg text-sm bg-white border border-[#E5E5E5] text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/10 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div
                id="login-error"
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
              className="w-full py-3 rounded-lg text-sm font-bold text-white bg-[#F05A28] hover:bg-[#CC4010] disabled:opacity-70 disabled:cursor-not-allowed transition-colors mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-xs text-[#9E9E9E]">ou</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          <p className="text-center text-sm text-[#9E9E9E]">
            Não tem conta?{' '}
            <Link href="/cadastro" className="font-bold text-[#F05A28] hover:text-[#CC4010] transition-colors">
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
