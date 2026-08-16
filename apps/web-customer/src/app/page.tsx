import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/5">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm text-[#9E9E9E] hover:text-white transition-colors font-medium">
            Entrar
          </Link>
          <Link
            href="/cadastro"
            className="text-sm font-bold bg-[#F05A28] text-white px-5 py-2.5 rounded-full hover:bg-[#CC4010] transition-[background-color,transform] duration-150 shadow-lg shadow-[#F05A28]/25 active:scale-[0.97]"
          >
            Começar grátis
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#F05A28] opacity-10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-24 right-16 w-3 h-3 bg-[#F05A28] rounded-sm rotate-45 opacity-60" />
        <div className="absolute top-36 right-24 w-1.5 h-1.5 bg-[#FFB800] rounded-full opacity-60" />
        <div className="absolute bottom-32 left-16 w-4 h-4 border-2 border-[#F05A28]/40 rotate-45" />
        <div className="absolute bottom-48 left-32 w-2 h-2 bg-[#F05A28] rounded-full opacity-40" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F05A28]/10 border border-[#F05A28]/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-[#F05A28] rounded-full" />
            <span className="text-[#F05A28] text-sm font-semibold">Marketplace #1 em construção civil</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Compre materiais de construção com os{' '}
            <span className="text-[#F05A28]">melhores preços</span>{' '}
            do mercado
          </h1>

          <p className="text-lg md:text-xl text-[#9E9E9E] max-w-2xl mx-auto leading-relaxed mb-10">
            Conectamos indústrias, lojas, construtoras, entregadores e consumidores em uma única plataforma.
            Compra fácil, entrega rápida, preços justos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/cadastro"
              className="inline-flex items-center gap-2 bg-[#F05A28] text-white font-black text-lg px-8 py-4 rounded-2xl hover:bg-[#CC4010] transition-[background-color,transform] duration-150 shadow-2xl shadow-[#F05A28]/30 active:scale-[0.97]"
            >
              Criar conta grátis
              <ArrowRight />
            </Link>
            <a href="#como-funciona" className="inline-flex items-center gap-2 text-[#9E9E9E] font-medium text-base hover:text-white transition-colors">
              <span>Como funciona</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16 border-t border-white/10 pt-12">
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-6 h-9 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="py-24 px-6 bg-[#F8F8F8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#F05A28] uppercase tracking-widest">Como funciona</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-3 mb-4">Simples assim</h2>
            <p className="text-[#9E9E9E] text-lg max-w-xl mx-auto">
              Em 3 passos você começa a comprar no maior marketplace de construção do Brasil
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <svg width="28" height="28" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
                title: 'Crie sua conta',
                desc: 'Cadastre-se gratuitamente em menos de 5 minutos. Processo 100% digital e sem burocracia.',
              },
              {
                step: '02',
                icon: <svg width="28" height="28" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
                title: 'Escolha seus materiais',
                desc: 'Busque produtos e compare preços de dezenas de lojas. Encontre o melhor custo-benefício.',
              },
              {
                step: '03',
                icon: <svg width="28" height="28" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
                title: 'Receba na obra',
                desc: 'Pague com Pix, cartão ou boleto e acompanhe a entrega em tempo real até a sua obra.',
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5] hover:border-[#F05A28]/30 hover:shadow-lg transition-[border-color,box-shadow] duration-200">
                <div className="text-xs font-black text-[#F05A28] mb-4 tracking-widest opacity-60">{item.step}</div>
                <div className="w-12 h-12 rounded-xl bg-[#FFF3EE] flex items-center justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-black text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#9E9E9E] leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR WHOM */}
      <section id="para-quem" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#F05A28] uppercase tracking-widest">Para quem é</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mt-3 mb-4">A sua plataforma</h2>
            <p className="text-[#9E9E9E] text-lg max-w-xl mx-auto">
              Cada perfil tem uma experiência personalizada dentro do ObraJá
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ROLES.map((role) => (
              <Link key={role.id} href={`/cadastro?tipo=${role.id}`} className="group block">
                <div className={`relative overflow-hidden rounded-3xl p-8 h-full hover:shadow-2xl border ${role.borderClass} ${role.bgClass} transition-shadow duration-200`}>
                  <div className={`absolute top-0 right-0 w-48 h-48 ${role.glowClass} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: role.iconBg }}>{role.icon}</div>
                      <div className={`text-xs font-bold px-3 py-1 rounded-full ${role.badgeClass}`}>{role.badge}</div>
                    </div>
                    <h3 className={`text-2xl font-black mb-3 ${role.titleColor}`}>{role.title}</h3>
                    <p className={`text-sm leading-relaxed mb-6 ${role.descColor}`}>{role.desc}</p>
                    <ul className="space-y-2 mb-8">
                      {role.features.map((f) => (
                        <li key={f} className={`flex items-center gap-2 text-sm ${role.descColor}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={role.checkColor}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className={`inline-flex items-center gap-2 font-bold text-sm ${role.ctaColor}`}>
                      Cadastrar como {role.shortTitle}
                      <span className="group-hover:translate-x-1 transition-transform duration-150 inline-block"><ArrowRight /></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#F05A28] uppercase tracking-widest">Funcionalidades</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">Tudo que você precisa</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-[#1A1A1A] p-8 hover:bg-[#2D2D2D] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#F05A28]/10 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-[#9E9E9E] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 px-6 bg-[#F05A28] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(45deg, #CC4010 25%, transparent 25%), linear-gradient(-45deg, #CC4010 25%, transparent 25%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px',
        }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Pronto para comprar com os melhores preços?
          </h2>
          <p className="text-white/80 text-xl mb-10">
            Mais de 500 lojas e 50 mil produtos esperando por você.
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-3 bg-white text-[#F05A28] font-black text-xl px-10 py-5 rounded-2xl hover:bg-[#1A1A1A] hover:text-white transition-[background-color,color,transform] duration-150 shadow-2xl active:scale-[0.97]"
          >
            Criar conta grátis
            <ArrowRight />
          </Link>
          <p className="text-white/60 text-sm mt-6">Sem cartão de crédito · Grátis para começar</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F0F0F] px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
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
                      <li key={link}><a href="#" className="text-[#666] text-sm hover:text-white transition-colors">{link}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#444] text-sm">© 2026 ObraJá. Todos os direitos reservados.</p>
            <p className="text-[#444] text-sm">Feito com ❤️ para a construção civil brasileira</p>
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
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

const ROLES = [
  {
    id: 'consumidor',
    shortTitle: 'Consumidor',
    title: 'Consumidor Final',
    badge: 'Para você',
    icon: <svg width="28" height="28" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    iconBg: 'rgba(240,90,40,0.12)',
    desc: 'Compre materiais de construção direto nas melhores lojas da sua região com entrega rápida na sua obra.',
    features: [
      'Compare preços de dezenas de lojas',
      'Entrega diretamente na obra',
      'Pague com Pix, cartão ou boleto',
      'Rastreamento em tempo real',
      'Histórico completo de pedidos',
    ],
    bgClass: 'bg-[#FFF8F5]',
    borderClass: 'border-[#F05A28]/20',
    glowClass: 'bg-[#F05A28]',
    titleColor: 'text-[#1A1A1A]',
    descColor: 'text-[#666]',
    checkColor: 'text-[#F05A28]',
    badgeClass: 'bg-[#F05A28] text-white',
    ctaColor: 'text-[#F05A28]',
  },
  {
    id: 'construtora',
    shortTitle: 'Construtora',
    title: 'Construtora',
    badge: 'Faturamento B2B',
    icon: <svg width="28" height="28" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>,
    iconBg: 'rgba(59,130,246,0.12)',
    desc: 'Compre materiais de múltiplos fornecedores com faturamento, cotações em massa e entrega diretamente na obra.',
    features: [
      'Cotação com múltiplos fornecedores',
      'Compra com faturamento B2B',
      'Entrega direta na obra',
      'Controle de orçamentos por projeto',
      'Histórico completo de compras',
    ],
    bgClass: 'bg-[#F5F8FF]',
    borderClass: 'border-blue-200',
    glowClass: 'bg-blue-500',
    titleColor: 'text-[#1A1A1A]',
    descColor: 'text-[#666]',
    checkColor: 'text-blue-500',
    badgeClass: 'bg-blue-500 text-white',
    ctaColor: 'text-blue-600',
  },
  {
    id: 'loja',
    shortTitle: 'Loja',
    title: 'Loja de Materiais',
    badge: 'Venda mais',
    icon: <svg width="28" height="28" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
    iconBg: 'rgba(240,90,40,0.12)',
    desc: 'Expanda suas vendas digitalmente. Alcance construtoras e consumidores em toda a região.',
    features: [
      'Dashboard com métricas de vendas',
      'Catálogo digital ilimitado',
      'Gestão de pedidos e entregas',
      'Integração com entregadores',
      'Relatórios financeiros',
    ],
    bgClass: 'bg-[#1A1A1A]',
    borderClass: 'border-white/10',
    glowClass: 'bg-[#F05A28]',
    titleColor: 'text-white',
    descColor: 'text-[#9E9E9E]',
    checkColor: 'text-[#F05A28]',
    badgeClass: 'bg-[#2D2D2D] text-[#F05A28]',
    ctaColor: 'text-[#F05A28]',
  },
  {
    id: 'entregador',
    shortTitle: 'Entregador',
    title: 'Entregador',
    badge: 'App mobile',
    icon: <svg width="28" height="28" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    iconBg: 'rgba(34,197,94,0.12)',
    desc: 'Faça entregas de materiais de construção na sua cidade com autonomia. Você decide quando trabalhar.',
    features: [
      'Aceite entregas pelo app',
      'GPS e rastreamento em tempo real',
      'Receba por cada entrega concluída',
      'Bônus por distância e peso',
      'Histórico de ganhos',
    ],
    bgClass: 'bg-[#F5FFF8]',
    borderClass: 'border-green-200',
    glowClass: 'bg-green-400',
    titleColor: 'text-[#1A1A1A]',
    descColor: 'text-[#666]',
    checkColor: 'text-green-600',
    badgeClass: 'bg-green-500 text-white',
    ctaColor: 'text-green-600',
  },
]

const FEATURES = [
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    title: 'Pagamentos integrados',
    desc: 'Pix, cartão, boleto e faturamento B2B. Seguro e protegido em todas as transações.',
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    title: 'Rastreamento em tempo real',
    desc: 'Acompanhe cada entrega com GPS ao vivo. Saiba exatamente onde está seu pedido.',
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    title: 'Compare preços',
    desc: 'Veja preços de dezenas de lojas em segundos e escolha o melhor custo-benefício.',
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    title: 'Notificações automáticas',
    desc: 'WhatsApp, push e e-mail para cada etapa do pedido. Sempre informado, sem ligações.',
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
    title: 'Lista de materiais',
    desc: 'Monte listas de obra, receba orçamentos de múltiplas lojas e gerencie seus projetos.',
  },
  {
    icon: <svg width="22" height="22" fill="none" stroke="#F05A28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    title: 'Compra 100% segura',
    desc: 'Pagamento protegido, garantia em todas as compras e suporte dedicado.',
  },
]
