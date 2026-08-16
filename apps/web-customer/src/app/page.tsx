import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[#1A1A1A] border-b border-white/10">
        <Logo />
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:block text-sm text-[#9E9E9E] hover:text-white transition-colors font-medium"
          >
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-bold bg-[#F05A28] text-white px-5 py-2.5 rounded-lg hover:bg-[#CC4010] transition-colors"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#1A1A1A] pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Encontre tudo para<br />
            <span className="text-[#F05A28]">sua obra</span>
          </h1>
          <p className="text-lg text-[#9E9E9E] max-w-xl mx-auto mb-10 leading-relaxed">
            Marketplace de materiais de construção com centenas de lojas, preços competitivos e entrega direta na obra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center gap-2 bg-[#F05A28] text-white font-bold text-base px-8 py-4 rounded-lg hover:bg-[#CC4010] transition-colors"
            >
              Criar conta grátis
              <ArrowRight />
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#9E9E9E] border border-white/10 px-8 py-4 rounded-lg hover:text-white hover:border-white/20 transition-colors"
            >
              Ver como funciona
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-12 mt-16 pt-12 border-t border-white/10">
            {[
              { value: '500+', label: 'Lojas cadastradas' },
              { value: '50 mil', label: 'Produtos disponíveis' },
              { value: '10 mil', label: 'Clientes ativos' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-[#9E9E9E] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 px-6 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">Como funciona</h2>
            <p className="text-[#9E9E9E] text-base max-w-md mx-auto">
              Em 3 passos você começa a comprar no maior marketplace de construção do Brasil
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: (
                  <svg width="24" height="24" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                ),
                title: 'Crie sua conta',
                desc: 'Cadastre-se gratuitamente em menos de 5 minutos. Processo 100% digital.',
              },
              {
                step: '02',
                icon: (
                  <svg width="24" height="24" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                ),
                title: 'Escolha seus materiais',
                desc: 'Busque produtos e compare preços de dezenas de lojas na sua região.',
              },
              {
                step: '03',
                icon: (
                  <svg width="24" height="24" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
                title: 'Receba na obra',
                desc: 'Pague com Pix, cartão ou boleto e acompanhe a entrega em tempo real.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-8 border border-[#E5E5E5] shadow-sm">
                <div className="text-xs font-black text-[#F05A28] mb-4 tracking-widest">{item.step}</div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF3EE] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#9E9E9E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section id="para-quem" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">Para quem é o ObraJá</h2>
            <p className="text-[#9E9E9E] text-base max-w-md mx-auto">
              Cada perfil tem uma experiência personalizada dentro da plataforma
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ROLES.map((role) => (
              <div key={role.id} className="bg-white rounded-xl p-8 border border-[#E5E5E5] shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#FFF3EE] flex items-center justify-center mb-4">
                  {role.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{role.title}</h3>
                <p className="text-sm text-[#9E9E9E] mb-4">{role.desc}</p>
                <ul className="space-y-2 mb-6">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#9E9E9E]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F05A28" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/cadastro?tipo=${role.id}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#F05A28] hover:text-[#CC4010] transition-colors"
                >
                  Saiba mais <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY OBRAJA */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1A1A1A] mb-4">Por que ObraJá</h2>
            <p className="text-[#9E9E9E] text-base max-w-md mx-auto">
              Simples, confiável e feito para a realidade da construção civil brasileira
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '500+',
                title: 'Lojas parceiras',
                text: 'Rede de lojas verificadas em todo o Brasil, com catálogo atualizado em tempo real.',
              },
              {
                number: 'Pix',
                title: 'Pagamento instantâneo',
                text: 'Pix, cartão, boleto e faturamento B2B. Segurança em todas as transações.',
              },
              {
                number: 'GPS',
                title: 'Entrega rastreada',
                text: 'Acompanhe cada entrega ao vivo. Saiba exatamente onde está o seu material.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 border border-[#E5E5E5] shadow-sm">
                <div className="text-3xl font-black text-[#F05A28] mb-3">{item.number}</div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#9E9E9E] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-[#F05A28]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Pronto para comprar com os melhores preços?
          </h2>
          <p className="text-white/80 text-base mb-10">
            Mais de 500 lojas e 50 mil produtos esperando por você.
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 bg-white text-[#F05A28] font-bold text-base px-10 py-4 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            Criar conta grátis
            <ArrowRight />
          </Link>
          <p className="text-white/60 text-sm mt-6">Sem cartão de crédito · Grátis para começar</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F0F0F] px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            <div className="md:w-1/3">
              <Logo />
              <p className="text-[#666] text-sm mt-4 leading-relaxed">
                O marketplace de materiais de construção que conecta toda a cadeia da construção civil brasileira.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: 'Plataforma', links: ['Como funciona', 'Para consumidores', 'Para lojas', 'Para construtoras', 'App do entregador'] },
                { title: 'Empresa', links: ['Sobre nós', 'Blog', 'Carreiras', 'Imprensa'] },
                { title: 'Suporte', links: ['Central de ajuda', 'Fale conosco', 'Políticas', 'Termos de uso'] },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-[#666] text-sm hover:text-white transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#444] text-sm">© 2026 ObraJá. Todos os direitos reservados.</p>
            <p className="text-[#444] text-sm">Feito para a construção civil brasileira</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Logo() {
  return (
    <span className="text-2xl font-black tracking-tight">
      <span className="text-white">Obra</span>
      <span className="text-[#F05A28]">Já</span>
    </span>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const ROLES = [
  {
    id: 'consumidor',
    title: 'Consumidor Final',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    desc: 'Compre materiais de construção direto nas melhores lojas da sua região com entrega rápida.',
    features: [
      'Compare preços de dezenas de lojas',
      'Entrega diretamente na obra',
      'Pague com Pix, cartão ou boleto',
      'Rastreamento em tempo real',
    ],
  },
  {
    id: 'construtora',
    title: 'Construtora',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="15" rx="1" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
      </svg>
    ),
    desc: 'Compre materiais de múltiplos fornecedores com faturamento e cotações em massa.',
    features: [
      'Cotação com múltiplos fornecedores',
      'Compra com faturamento B2B',
      'Controle de orçamentos por projeto',
      'Histórico completo de compras',
    ],
  },
  {
    id: 'loja',
    title: 'Loja de Materiais',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    desc: 'Expanda suas vendas digitalmente. Alcance construtoras e consumidores em toda a região.',
    features: [
      'Dashboard com métricas de vendas',
      'Catálogo digital ilimitado',
      'Gestão de pedidos e entregas',
      'Relatórios financeiros',
    ],
  },
  {
    id: 'entregador',
    title: 'Entregador',
    icon: (
      <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    desc: 'Faça entregas de materiais de construção com autonomia. Você decide quando trabalhar.',
    features: [
      'Aceite entregas pelo app',
      'GPS e rastreamento em tempo real',
      'Receba por cada entrega concluída',
      'Bônus por distância e peso',
    ],
  },
]
