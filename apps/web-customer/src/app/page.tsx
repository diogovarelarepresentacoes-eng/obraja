import Link from 'next/link'

const USER_TYPES = [
  {
    id: 'construtora',
    emoji: '🏗️',
    title: 'Construtora',
    description: 'Compre materiais em grande escala com preços especiais B2B e controle total dos pedidos',
    color: '#F05A28',
  },
  {
    id: 'loja',
    emoji: '🏪',
    title: 'Loja / Revenda',
    description: 'Venda seus produtos para construtoras e consumidores. Gerencie estoque e entregas',
    color: '#CC4010',
  },
  {
    id: 'industria',
    emoji: '🏭',
    title: 'Indústria / Fábrica',
    description: 'Distribua sua produção para lojas e construtoras em todo o Brasil',
    color: '#1A1A1A',
  },
  {
    id: 'entregador',
    emoji: '🚚',
    title: 'Entregador',
    description: 'Faça entregas de materiais de construção e ganhe por cada serviço realizado',
    color: '#FFB800',
  },
  {
    id: 'consumidor',
    emoji: '🏠',
    title: 'Consumidor Final',
    description: 'Compre materiais direto na loja mais próxima com entrega rápida na sua obra',
    color: '#4CAF50',
  },
]

const BENEFITS = [
  { emoji: '💰', title: 'Melhores preços', text: 'Compare preços de dezenas de lojas em segundos' },
  { emoji: '🚚', title: 'Entrega na obra', text: 'Entregamos diretamente no endereço da sua obra' },
  { emoji: '📋', title: 'Lista de materiais', text: 'Monte sua lista e receba orçamentos de múltiplas lojas' },
  { emoji: '🔒', title: 'Compra segura', text: 'Pagamento protegido e garantia em todas as compras' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Cadastre-se', text: 'Crie sua conta grátis em menos de 5 minutos' },
  { step: '02', title: 'Escolha seus materiais', text: 'Busque produtos e compare preços das melhores lojas' },
  { step: '03', title: 'Receba na obra', text: 'Pague com Pix, cartão ou boleto e acompanhe a entrega' },
]

export default function LandingPage() {
  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh' }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50"
        style={{ background: '#1A1A1A', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between" style={{ height: '64px' }}>
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span style={{ color: '#F05A28' }}>Já</span>
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold px-4 py-2 rounded-xl"
              style={{ color: '#fff', border: '1px solid #3D3D3D' }}
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="text-sm font-black px-4 py-2 rounded-xl text-white"
              style={{ background: '#F05A28' }}
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #2D2D2D 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6"
            style={{ background: '#F05A2820', color: '#F05A28', border: '1px solid #F05A2840' }}
          >
            🏗️ Marketplace de Construção Civil
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Compre materiais de construção com os{' '}
            <span style={{ color: '#F05A28' }}>melhores preços</span> do mercado
          </h1>
          <p className="text-lg mb-8" style={{ color: '#9E9E9E' }}>
            Conectamos indústrias, lojas, construtoras, entregadores e consumidores em uma única plataforma.
            Compare preços, faça pedidos e acompanhe entregas em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cadastro"
              className="px-8 py-4 rounded-2xl text-base font-black text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)', boxShadow: '0 8px 24px rgba(240,90,40,0.4)' }}
            >
              Cadastre-se Grátis →
            </Link>
            <Link
              href="/home"
              className="px-8 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105"
              style={{ background: '#3D3D3D', color: '#fff' }}
            >
              Ver o marketplace
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-10">
            {[
              { num: '500+', label: 'Lojas cadastradas' },
              { num: '50k+', label: 'Produtos disponíveis' },
              { num: '10k+', label: 'Clientes ativos' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white">{num}</p>
                <p className="text-xs mt-1" style={{ color: '#9E9E9E' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4" style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10" style={{ color: '#1A1A1A' }}>
            Como funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, text }) => (
              <div key={step} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #F05A28, #CC4010)' }}
                >
                  {step}
                </div>
                <h3 className="font-black text-lg mb-2" style={{ color: '#1A1A1A' }}>{title}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 px-4" style={{ background: '#F5F5F5' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-10" style={{ color: '#1A1A1A' }}>
            Por que escolher o ObraJá?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ emoji, title, text }) => (
              <div
                key={title}
                className="rounded-2xl p-5"
                style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-black text-sm mb-1" style={{ color: '#1A1A1A' }}>{title}</h3>
                <p className="text-xs" style={{ color: '#9E9E9E' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USER TYPES */}
      <section className="py-16 px-4" style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-3" style={{ color: '#1A1A1A' }}>
            Para quem é o ObraJá?
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: '#9E9E9E' }}>
            Escolha seu perfil e cadastre-se gratuitamente
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USER_TYPES.map(({ id, emoji, title, description, color }) => (
              <Link
                key={id}
                href={`/cadastro?tipo=${id}`}
                className="rounded-2xl p-6 group transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{ background: '#F5F5F5', border: `2px solid ${color}22` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${color}15` }}
                >
                  {emoji}
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: '#1A1A1A' }}>{title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#666' }}>{description}</p>
                <span className="text-xs font-black" style={{ color }}>
                  Cadastrar como {title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #F05A28 0%, #CC4010 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">
            Comece agora, é grátis!
          </h2>
          <p className="text-white/80 mb-8 text-base">
            Junte-se a milhares de profissionais da construção civil que já usam o ObraJá.
          </p>
          <Link
            href="/cadastro"
            className="inline-block px-10 py-4 rounded-2xl text-base font-black transition-all hover:scale-105"
            style={{ background: '#fff', color: '#F05A28', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            Criar conta gratuita →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 text-center" style={{ background: '#1A1A1A' }}>
        <span className="text-xl font-black">
          <span className="text-white">Obra</span>
          <span style={{ color: '#F05A28' }}>Já</span>
        </span>
        <p className="text-xs mt-2 mb-4" style={{ color: '#9E9E9E' }}>
          O marketplace de materiais de construção civil
        </p>
        <div className="flex justify-center gap-6">
          {['Sobre', 'Termos', 'Privacidade', 'Contato'].map((label) => (
            <Link key={label} href={`/${label.toLowerCase()}`} className="text-xs hover:underline" style={{ color: '#9E9E9E' }}>
              {label}
            </Link>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: '#4D4D4D' }}>© 2026 ObraJá. Todos os direitos reservados.</p>
      </footer>

    </div>
  )
}
