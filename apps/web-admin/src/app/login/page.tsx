'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) return setError('Preencha todos os campos')
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 800))
      router.push('/dashboard')
    } catch {
      setError('Credenciais inválidas')
    } finally {
      setLoading(false)
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
          <p className="text-[#9E9E9E] text-sm mt-2 font-medium uppercase tracking-widest">Painel Admin</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-black text-[#1A1A1A] mb-1">Acesso restrito</h1>
          <p className="text-[#9E9E9E] text-sm mb-8">Entre com suas credenciais de administrador</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@obraja.com.br"
                className="w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] focus:border-[#F05A28] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] focus:border-[#F05A28] focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#F05A28] text-white font-bold rounded-xl hover:bg-[#CC4010] transition-all active:scale-95 disabled:opacity-60"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p className="text-center text-[#666] text-xs mt-8">
          ObraJá © 2026 — Painel Administrativo
        </p>
      </div>
    </div>
  )
}
