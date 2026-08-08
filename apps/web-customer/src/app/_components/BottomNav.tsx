import Link from 'next/link'

type Tab = 'home' | 'busca' | 'obra' | 'pedidos' | 'perfil'

const NAV_ITEMS = [
  { id: 'home',    href: '/',            emoji: '🏠', label: 'Home' },
  { id: 'busca',   href: '/busca',       emoji: '🔎', label: 'Busca' },
  { id: 'obra',    href: '/minha-obra',  emoji: '📋', label: 'Minha Obra' },
  { id: 'pedidos', href: '/pedidos',     emoji: '📦', label: 'Pedidos' },
  { id: 'perfil',  href: '/perfil',      emoji: '👤', label: 'Perfil' },
] as const

export default function BottomNav({ active }: { active: Tab }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
      style={{
        height: 'var(--bottom-nav-height)',
        background: '#fff',
        borderTop: '1px solid #E5E5E5',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
      }}
      aria-label="Navegação principal"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active
        return (
          <Link
            key={item.id}
            href={item.href}
            className="relative flex-1 flex flex-col items-center justify-center gap-0.5 tap-highlight"
          >
            <span className="text-xl leading-none">{item.emoji}</span>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? '#F05A28' : '#9E9E9E' }}
            >
              {item.label}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 w-8 h-0.5 rounded-t-full"
                style={{ background: '#F05A28' }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
