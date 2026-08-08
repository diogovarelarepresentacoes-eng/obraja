'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: integrate with API
    alert('Login em desenvolvimento')
  }

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>
      <header
        className="sticky top-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
          <Link href="/">
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: '#1A1A1A' }}>
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
                placeholder="Sua senha"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: '#F5F5F5', border: '1.5px solid #E5E5E5', color: '#1A1A1A' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-sm font-black text-white transition-all hover:scale-[1.02] mt-2"
              style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)', boxShadow: '0 8px 24px rgba(240,90,40,0.35)' }}
            >
              Entrar →
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: '#9E9E9E' }}>
          Não tem conta?{' '}
          <Link href="/cadastro" className="font-bold" style={{ color: '#F05A28' }}>
            Cadastre-se grátis
          </Link>
        </p>
      </main>
    </div>
  )
}
