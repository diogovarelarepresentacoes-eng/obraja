'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/pedidos',
    label: 'Pedidos',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/cotacoes',
    label: 'Cotações',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    href: '/fornecedores',
    label: 'Fornecedores',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: '/historico',
    label: 'Histórico',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/financeiro',
    label: 'Financeiro',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: '/configuracoes',
    label: 'Configurações',
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/pedidos': 'Pedidos',
  '/cotacoes': 'Cotações',
  '/fornecedores': 'Fornecedores',
  '/historico': 'Histórico',
  '/financeiro': 'Financeiro',
  '/configuracoes': 'Configurações',
}

export function SidebarNav() {
  const pathname = usePathname()

  const currentTitle = pageTitles[pathname] ?? 'Portal da Construtora'

  return (
    <>
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0"
        style={{ width: 240, background: '#1A1A1A', minHeight: '100vh' }}
      >
        {/* Logo */}
        <div className="flex flex-col gap-1 px-6 pt-7 pb-6 border-b border-white/10">
          <div className="text-2xl font-black tracking-tight">
            <span style={{ color: '#fff' }}>Obra</span>
            <span style={{ color: '#F05A28' }}>Já</span>
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#F05A28' }}
          >
            Construtora
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1 px-3 py-5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative"
                style={{
                  color: isActive ? '#F05A28' : '#9E9E9E',
                  background: isActive ? 'rgba(241,89,29,0.10)' : 'transparent',
                  borderLeft: isActive ? '3px solid #F05A28' : '3px solid transparent',
                }}
              >
                <span style={{ color: isActive ? '#F05A28' : '#9E9E9E' }}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom: company / user */}
        <div className="px-4 py-5 border-t border-white/10 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ background: '#F05A28', color: '#fff' }}
          >
            CH
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: '#fff' }}>
              Construtora Horizonte
            </p>
            <p className="text-xs truncate" style={{ color: '#9E9E9E' }}>
              Ltda
            </p>
          </div>
        </div>
      </aside>

      {/* Top bar — fixed to the content area, rendered here for simplicity */}
      <div
        className="fixed top-0 flex items-center justify-between px-8 z-10"
        style={{
          left: 240,
          right: 0,
          height: 64,
          background: '#fff',
          borderBottom: '1px solid #F2F2F2',
        }}
      >
        <h1 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
          {currentTitle}
        </h1>
        <div className="flex items-center gap-4">
          {/* Bell */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#1A1A1A" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: '#F05A28' }}
            />
          </button>
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
            style={{ background: '#1A1A1A', color: '#fff' }}
          >
            CH
          </div>
        </div>
      </div>
    </>
  )
}
