'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/aprovacoes', icon: '✅', label: 'Aprovações', badge: 38 },
  { href: '/produtos', icon: '📦', label: 'Produtos', badge: 94 },
  { href: '/usuarios', icon: '👥', label: 'Usuários' },
  { href: '/pedidos', icon: '🛒', label: 'Pedidos' },
  { href: '/comissoes', icon: '💰', label: 'Comissões' },
  { href: '/moderacao', icon: '🛡️', label: 'Moderação', badge: 12 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1A1A] flex flex-col fixed top-0 left-0 bottom-0 z-40">
        <div className="px-5 py-6 border-b border-white/10">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
          <div className="text-[10px] text-[#666] uppercase tracking-widest mt-0.5 font-bold">Admin</div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'bg-[#F05A28]/15 text-white border-l-2 border-[#F05A28] pl-2.5'
                    : 'text-[#9E9E9E] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-[#F05A28] text-white font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
          <Link href="/configuracoes" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#9E9E9E] hover:text-white hover:bg-white/5 transition-all">
            <span className="text-base">⚙️</span>
            <span>Configurações</span>
          </Link>
          <button
            onClick={() => router.push('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#9E9E9E] hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span className="text-base">🚪</span>
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#E5E5E5] flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Buscar usuários, pedidos, lojas..."
              className="pl-9 pr-4 h-9 w-72 bg-[#F8F8F8] rounded-xl text-sm border border-[#E5E5E5] focus:border-[#F05A28] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-[#F8F8F8] transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F05A28] rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#E5E5E5]">
              <div className="w-8 h-8 rounded-full bg-[#F05A28] flex items-center justify-center text-white text-xs font-bold">
                AD
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1A1A1A] leading-none">Admin</div>
                <div className="text-xs text-[#9E9E9E] mt-0.5">Administrador</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
