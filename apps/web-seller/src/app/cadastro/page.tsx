import Link from 'next/link'

const ROLES = [
  {
    id: 'loja',
    icon: '🏪',
    title: 'Loja de Materiais',
    subtitle: 'Venda para construtoras e consumidores',
    desc: 'Você tem uma loja física ou virtual de materiais de construção e quer expandir suas vendas digitalmente.',
    color: '#F05A28',
    bgHover: 'hover:border-[#F05A28]',
    badgeBg: 'bg-[#FFF3EE]',
    badgeText: 'text-[#F05A28]',
    badge: 'Painel web',
    cta: 'Quero vender como loja',
  },
  {
    id: 'industria',
    icon: '🏭',
    title: 'Indústria / Fábrica',
    subtitle: 'Distribua para todo o Brasil',
    desc: 'Você fabrica ou distribui materiais de construção e quer conectar-se a lojas e construtoras de forma escalável.',
    color: '#F05A28',
    bgHover: 'hover:border-[#F05A28]',
    badgeBg: 'bg-[#FFF3EE]',
    badgeText: 'text-[#F05A28]',
    badge: 'Painel web',
    cta: 'Quero distribuir como indústria',
  },
  {
    id: 'construtora',
    icon: '🏗️',
    title: 'Construtora',
    subtitle: 'Compre com faturamento e entrega na obra',
    desc: 'Você é uma empresa de construção e precisa de fornecedores confiáveis, cotações rápidas e entrega direta no canteiro.',
    color: '#3B82F6',
    bgHover: 'hover:border-blue-400',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-600',
    badge: 'Painel web',
    cta: 'Quero comprar como construtora',
  },
  {
    id: 'entregador',
    icon: '🛵',
    title: 'Entregador',
    subtitle: 'Ganhe dinheiro fazendo entregas',
    desc: 'Você tem um veículo e quer trabalhar com autonomia, entregando materiais de construção pela sua cidade.',
    color: '#22C55E',
    bgHover: 'hover:border-green-400',
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-600',
    badge: 'App mobile',
    cta: 'Quero me tornar entregador',
  },
]

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Header */}
      <header className="bg-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight">
          <span className="text-white">Obra</span>
          <span className="text-[#F05A28]">Já</span>
        </Link>
        <span className="text-[#9E9E9E] text-sm">
          Já tem conta?{' '}
          <Link href="/store/dashboard" className="text-[#F05A28] font-semibold hover:underline">
            Entrar
          </Link>
        </span>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-16 max-w-5xl mx-auto w-full">
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F05A28] text-white text-sm font-bold flex items-center justify-center">1</div>
            <span className="text-sm font-bold text-[#1A1A1A]">Escolha seu perfil</span>
          </div>
          <div className="flex-1 h-px bg-[#E5E5E5]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5E5E5] text-[#9E9E9E] text-sm font-bold flex items-center justify-center">2</div>
            <span className="text-sm text-[#9E9E9E]">Preencha seus dados</span>
          </div>
          <div className="flex-1 h-px bg-[#E5E5E5]" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E5E5E5] text-[#9E9E9E] text-sm font-bold flex items-center justify-center">3</div>
            <span className="text-sm text-[#9E9E9E]">Comece a usar</span>
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#1A1A1A] mb-3">Qual é o seu perfil?</h1>
          <p className="text-[#9E9E9E] text-lg">
            Escolha como você vai usar o ObraJá. Cada perfil tem funcionalidades próprias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Link key={role.id} href={`/cadastro/${role.id}`} className="group block">
              <div
                className={`bg-white rounded-2xl p-7 border-2 border-transparent ${role.bgHover} transition-all hover:shadow-xl cursor-pointer relative overflow-hidden`}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: role.color }}
                />

                <div className="flex items-start gap-5">
                  <div className="text-5xl shrink-0 mt-1">{role.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-black text-[#1A1A1A]">{role.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${role.badgeBg} ${role.badgeText}`}>
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-2" style={{ color: role.color }}>
                      {role.subtitle}
                    </p>
                    <p className="text-[#9E9E9E] text-sm leading-relaxed">{role.desc}</p>
                  </div>
                </div>

                <div
                  className="mt-5 flex items-center justify-between pt-5 border-t border-[#F2F2F2]"
                >
                  <span className="text-sm font-bold" style={{ color: role.color }}>
                    {role.cta}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    style={{ color: role.color }}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-[#9E9E9E] text-sm mt-8">
          Ao criar uma conta, você concorda com os{' '}
          <a href="#" className="text-[#F05A28] hover:underline">Termos de Uso</a>
          {' '}e a{' '}
          <a href="#" className="text-[#F05A28] hover:underline">Política de Privacidade</a>.
        </p>
      </main>
    </div>
  )
}
