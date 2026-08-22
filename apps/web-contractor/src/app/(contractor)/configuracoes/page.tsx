'use client'

import { useState } from 'react'

const PRIMARY = '#F05A28'

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'empresa' | 'contato' | 'notificacoes' | 'pagamento' | 'usuarios'>('empresa')
  const [saved, setSaved] = useState(false)
  const [notifs, setNotifs] = useState({
    novasCotacoes: true,
    pedidosAtualizados: true,
    entregasRastreamento: true,
    faturaVencimento: true,
    promocoes: false,
    relatoriosSemanais: true,
  })
  const [paymentTerms, setPaymentTerms] = useState<'30' | '60' | '90'>('30')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const TABS = [
    { key: 'empresa', label: 'Empresa' },
    { key: 'contato', label: 'Contato' },
    { key: 'notificacoes', label: 'Notificações' },
    { key: 'pagamento', label: 'Pagamento' },
    { key: 'usuarios', label: 'Usuários' },
  ] as const

  return (
    <main className="flex-1 px-8 py-8" style={{ marginTop: 64 }}>
      <div className="mb-6">
        <div className="text-2xl font-black" style={{ color: '#1A1A1A' }}>Configurações</div>
        <div className="text-sm mt-1" style={{ color: '#9E9E9E' }}>Gerencie as informações da sua empresa e preferências</div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={activeTab === t.key
                  ? { background: PRIMARY, color: '#fff' }
                  : { color: '#9E9E9E', background: 'transparent' }}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* EMPRESA */}
          {activeTab === 'empresa' && (
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
              <div className="font-bold text-lg mb-6" style={{ color: '#1A1A1A' }}>Dados da Empresa</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Razão Social</label>
                  <input defaultValue="Construtora Horizonte Ltda" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Nome Fantasia</label>
                  <input defaultValue="Horizonte Construções" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>CNPJ</label>
                  <input defaultValue="12.345.678/0001-90" readOnly
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#9E9E9E', background: '#F8F8F8' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Inscrição Estadual</label>
                  <input defaultValue="123.456.789.000" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Porte da Empresa</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}>
                    <option>MEI</option>
                    <option>ME</option>
                    <option selected>EPP</option>
                    <option>Médio</option>
                    <option>Grande</option>
                  </select>
                </div>
                <div className="col-span-2 border-t pt-4 mt-2" style={{ borderColor: '#F2F2F2' }}>
                  <div className="text-sm font-bold mb-3" style={{ color: '#1A1A1A' }}>Endereço</div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>CEP</label>
                  <input defaultValue="01310-100" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Rua</label>
                  <input defaultValue="Av. Paulista" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Número</label>
                  <input defaultValue="1234" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Complemento</label>
                  <input defaultValue="Sala 5" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Bairro</label>
                  <input defaultValue="Bela Vista" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Cidade</label>
                  <input defaultValue="São Paulo" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Estado</label>
                  <select className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }}>
                    <option selected>SP</option>
                    <option>RJ</option>
                    <option>MG</option>
                    <option>RS</option>
                    <option>PR</option>
                    <option>BA</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* CONTATO */}
          {activeTab === 'contato' && (
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
              <div className="font-bold text-lg mb-6" style={{ color: '#1A1A1A' }}>Informações de Contato</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Nome do Responsável</label>
                  <input defaultValue="Carlos Andrade" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Cargo</label>
                  <input defaultValue="Diretor de Compras" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>E-mail Principal</label>
                  <input type="email" defaultValue="carlos@horizonteconstrucoes.com.br"
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>E-mail Financeiro</label>
                  <input type="email" defaultValue="financeiro@horizonteconstrucoes.com.br"
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Telefone</label>
                  <input type="tel" defaultValue="(11) 99987-6543" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>WhatsApp</label>
                  <input type="tel" defaultValue="(11) 99987-6543" className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#9E9E9E' }}>Site</label>
                  <input type="url" defaultValue="www.horizonteconstrucoes.com.br"
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{ borderColor: '#E5E5E5', color: '#1A1A1A' }} />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICACOES */}
          {activeTab === 'notificacoes' && (
            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
              <div className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>Preferências de Notificação</div>
              <div className="text-sm mb-6" style={{ color: '#9E9E9E' }}>Escolha quais eventos geram alertas no painel e no e-mail</div>
              <div className="space-y-4">
                {([
                  { key: 'novasCotacoes', label: 'Novas cotações recebidas', desc: 'Quando fornecedores respondem suas solicitações' },
                  { key: 'pedidosAtualizados', label: 'Atualização de pedidos', desc: 'Confirmação, preparo e saída para entrega' },
                  { key: 'entregasRastreamento', label: 'Rastreamento de entregas', desc: 'Atualizações em tempo real do entregador' },
                  { key: 'faturaVencimento', label: 'Vencimento de faturas', desc: 'Aviso 3 dias antes do prazo de pagamento' },
                  { key: 'promocoes', label: 'Promoções e ofertas', desc: 'Descontos exclusivos dos fornecedores parceiros' },
                  { key: 'relatoriosSemanais', label: 'Relatório semanal', desc: 'Resumo de gastos e pedidos toda segunda-feira' },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: '#F8F8F8' }}>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#9E9E9E' }}>{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className="relative w-11 h-6 rounded-full transition-all shrink-0"
                      style={{ background: notifs[item.key] ? PRIMARY : '#D1D5DB' }}>
                      <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                        style={{ left: notifs[item.key] ? '22px' : '2px' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAGAMENTO */}
          {activeTab === 'pagamento' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
                <div className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>Condições de Pagamento</div>
                <div className="text-sm mb-6" style={{ color: '#9E9E9E' }}>Prazo padrão para faturamento com fornecedores</div>
                <div className="flex gap-3">
                  {(['30', '60', '90'] as const).map(term => (
                    <button key={term} onClick={() => setPaymentTerms(term)}
                      className="flex-1 py-4 rounded-xl border-2 text-sm font-bold transition-all"
                      style={paymentTerms === term
                        ? { borderColor: PRIMARY, background: '#fff5f1', color: PRIMARY }
                        : { borderColor: '#E5E5E5', color: '#9E9E9E' }}>
                      {term} dias
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
                <div className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>Limite de Crédito</div>
                <div className="text-sm mb-5" style={{ color: '#9E9E9E' }}>Crédito aprovado para faturamento ObraJá</div>
                <div className="rounded-xl p-4" style={{ background: '#F8F8F8' }}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>Limite disponível</span>
                    <span className="text-lg font-black" style={{ color: '#16a34a' }}>R$ 200.000</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#E5E5E5' }}>
                    <div className="h-full rounded-full" style={{ width: '37%', background: PRIMARY }} />
                  </div>
                  <div className="flex justify-between mt-2 text-xs" style={{ color: '#9E9E9E' }}>
                    <span>Utilizado: R$ 73.500</span>
                    <span>37% do limite</span>
                  </div>
                </div>
                <div className="mt-4 text-xs p-3 rounded-xl" style={{ background: '#fffbeb', color: '#b45309' }}>
                  Para aumentar seu limite de crédito, entre em contato com suporte@obraja.com.br
                </div>
              </div>

              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#F2F2F2' }}>
                <div className="font-bold text-lg mb-5" style={{ color: '#1A1A1A' }}>Chave Pix Cadastrada</div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8F8F8' }}>
                  <span className="text-2xl">🔑</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>CNPJ: 12.345.678/0001-90</div>
                    <div className="text-xs" style={{ color: '#9E9E9E' }}>Chave verificada em 15/03/2026</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USUARIOS */}
          {activeTab === 'usuarios' && (
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#F2F2F2' }}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#F2F2F2' }}>
                <div className="font-bold text-lg" style={{ color: '#1A1A1A' }}>Acesso de Usuários</div>
                <button className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: PRIMARY, color: '#fff' }}>
                  + Convidar
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #F2F2F2' }}>
                    {['Nome', 'E-mail', 'Perfil', 'Status', ''].map(h => (
                      <th key={h} className="text-left text-xs font-bold uppercase tracking-wide px-6 py-3" style={{ color: '#9E9E9E' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Carlos Andrade', email: 'carlos@horizonteconstrucoes.com.br', role: 'Administrador', status: 'Ativo', you: true },
                    { name: 'Mariana Costa', email: 'mariana@horizonteconstrucoes.com.br', role: 'Compras', status: 'Ativo', you: false },
                    { name: 'Rafael Lima', email: 'rafael@horizonteconstrucoes.com.br', role: 'Financeiro', status: 'Ativo', you: false },
                    { name: 'Juliana Ramos', email: 'juliana@horizonteconstrucoes.com.br', role: 'Visualizador', status: 'Pendente', you: false },
                  ].map((u, i) => (
                    <tr key={u.email} style={{ borderBottom: i < 3 ? '1px solid #F8F8F8' : 'none' }}
                      className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ background: PRIMARY }}>{u.name[0]}</div>
                          <span className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{u.name}</span>
                          {u.you && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#F2F2F2', color: '#9E9E9E' }}>Você</span>}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm" style={{ color: '#666' }}>{u.email}</td>
                      <td className="px-6 py-3.5">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: '#F2F2F2', color: '#1A1A1A' }}>{u.role}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="text-xs font-semibold" style={{ color: u.status === 'Ativo' ? '#16a34a' : '#b45309' }}>{u.status}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        {!u.you && (
                          <button className="text-xs font-bold hover:underline" style={{ color: '#9E9E9E' }}>Remover</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Save button (except usuarios tab) */}
          {activeTab !== 'usuarios' && (
            <div className="mt-5 flex items-center gap-3">
              <button onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: PRIMARY, color: '#fff' }}>
                Salvar Alterações
              </button>
              {saved && <span className="text-sm font-semibold" style={{ color: '#16a34a' }}>✓ Salvo com sucesso</span>}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
