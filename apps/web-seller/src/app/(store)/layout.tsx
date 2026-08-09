'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    href: '/store/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/store/pedidos',
    label: 'Pedidos',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    href: '/store/catalogo',
    label: 'Catálogo',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="5" height="5" rx="1" />
        <rect x="10" y="3" width="5" height="5" rx="1" />
        <rect x="17" y="3" width="4" height="5" rx="1" />
        <rect x="3" y="10" width="5" height="5" rx="1" />
        <rect x="10" y="10" width="5" height="5" rx="1" />
        <rect x="17" y="10" width="4" height="5" rx="1" />
        <rect x="3" y="17" width="5" height="4" rx="1" />
        <rect x="10" y="17" width="5" height="4" rx="1" />
        <rect x="17" y="17" width="4" height="4" rx="1" />
      </svg>
    ),
  },
  {
    href: '/store/entregas',
    label: 'Entregas',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    href: '/store/reposicao',
    label: 'Reposição',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
  },
  {
    href: '/store/clientes',
    label: 'Clientes',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: '/store/financeiro',
    label: 'Financeiro',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    href: '/store/configuracoes',
    label: 'Configurações',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

const pageTitles: Record<string, string> = {
  '/store/dashboard': 'Dashboard',
  '/store/pedidos': 'Pedidos',
  '/store/catalogo': 'Catálogo de Produtos',
  '/store/entregas': 'Gestão de Entregas',
  '/store/reposicao': 'Pedidos de Reposição',
  '/store/clientes': 'Clientes',
  '/store/financeiro': 'Financeiro',
  '/store/configuracoes': 'Configurações',
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden md:flex flex-col w-[240px] min-h-screen bg-[#1A1A1A] shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
          <span className="text-[10px] font-bold bg-[#F05A28] text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
            Loja
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#F05A28]/15 text-white'
                  : 'text-[#9E9E9E] hover:bg-[#2D2D2D] hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-[#2D2D2D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F05A28] flex items-center justify-center text-white text-sm font-bold shrink-0">
            MB
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">Materiais Belo Ltda.</p>
            <p className="text-[#9E9E9E] text-xs truncate">loja@materiaisbelo.com.br</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pageTitle = pageTitles[pathname] ?? 'Painel da Loja'

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <Sidebar pathname={pathname} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="bg-white border-b border-[#E5E5E5] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-black text-[#1A1A1A] tracking-tight">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-[#F2F2F2] transition-colors">
              <svg width="20" height="20" fill="none" stroke="#1A1A1A" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F05A28] rounded-full" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[#F05A28] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              MB
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
