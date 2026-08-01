const stockItems = [
  {
    emoji: '🏗️',
    nome: 'Cimento CP-II 50kg',
    categoria: 'Cimento',
    atual: 15200,
    minimo: 5000,
    pedido: 8000,
    ultimaAtualizacao: '01/08/2026',
  },
  {
    emoji: '🏗️',
    nome: 'Cimento CP-V 50kg',
    categoria: 'Cimento',
    atual: 8400,
    minimo: 3000,
    pedido: 5000,
    ultimaAtualizacao: '01/08/2026',
  },
  {
    emoji: '🪣',
    nome: 'Argamassa AC-II 20kg',
    categoria: 'Argamassa',
    atual: 4200,
    minimo: 2000,
    pedido: 3000,
    ultimaAtualizacao: '31/07/2026',
  },
  {
    emoji: '🪣',
    nome: 'Argamassa AC-I 20kg',
    categoria: 'Argamassa',
    atual: 2800,
    minimo: 2000,
    pedido: 3000,
    ultimaAtualizacao: '31/07/2026',
  },
  {
    emoji: '🧴',
    nome: 'Calafetar 300ml',
    categoria: 'Vedantes',
    atual: 1200,
    minimo: 2000,
    pedido: 3000,
    ultimaAtualizacao: '30/07/2026',
  },
  {
    emoji: '🔩',
    nome: 'Tela de Aço 6m × 2,4m',
    categoria: 'Ferragens',
    atual: 320,
    minimo: 500,
    pedido: 800,
    ultimaAtualizacao: '29/07/2026',
  },
  {
    emoji: '🏠',
    nome: 'Telha Cerâmica',
    categoria: 'Coberturas',
    atual: 42000,
    minimo: 10000,
    pedido: 20000,
    ultimaAtualizacao: '28/07/2026',
  },
  {
    emoji: '🧱',
    nome: 'Bloco Cerâmico 9×19×19',
    categoria: 'Blocos',
    atual: 180000,
    minimo: 50000,
    pedido: 100000,
    ultimaAtualizacao: '01/08/2026',
  },
]

const alerts = [
  {
    nome: 'Calafetar 300ml',
    atual: 1200,
    minimo: 2000,
    unidade: 'un',
    severity: 'critical',
  },
  {
    nome: 'Tela de Aço 6m × 2,4m',
    atual: 320,
    minimo: 500,
    unidade: 'pç',
    severity: 'warning',
  },
]

function getStockPercent(atual: number, minimo: number, pedido: number): number {
  const max = pedido * 2
  return Math.min(100, Math.round((atual / max) * 100))
}

function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR')
}

export default function EstoquePage() {
  const lowStockCount = stockItems.filter((i) => i.atual < i.minimo).length
  const totalStock = stockItems.reduce((acc, i) => acc + i.atual, 0)

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
          <p className="text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide mb-1">Estoque Baixo</p>
          <p className="text-3xl font-black text-[#F05A28]">{lowStockCount}</p>
          <p className="text-xs text-[#9E9E9E] mt-1">produtos abaixo do mínimo</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
          <p className="text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide mb-1">Total em Estoque</p>
          <p className="text-3xl font-black text-[#1A1A1A]">~{formatNumber(totalStock)}</p>
          <p className="text-xs text-[#9E9E9E] mt-1">unidades (todas linhas)</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
          <p className="text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide mb-1">Alertas Ativos</p>
          <p className="text-3xl font-black text-red-500">2</p>
          <p className="text-xs text-[#9E9E9E] mt-1">requerem atenção imediata</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        <h2 className="text-base font-black text-[#1A1A1A]">Alertas de Estoque</h2>
        {alerts.map((a) => (
          <div
            key={a.nome}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border-l-4 bg-white ${
              a.severity === 'critical' ? 'border-red-500' : 'border-yellow-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                a.severity === 'critical' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                <svg width="18" height="18" fill="none" stroke={a.severity === 'critical' ? '#ef4444' : '#d97706'} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[#1A1A1A]">{a.nome}</p>
                <p className="text-sm text-[#9E9E9E]">
                  Estoque atual: <span className={`font-semibold ${a.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'}`}>{formatNumber(a.atual)} {a.unidade}</span>
                  {' '}— Mínimo: <span className="font-semibold text-[#1A1A1A]">{formatNumber(a.minimo)} {a.unidade}</span>
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-xs font-bold bg-[#F05A28] text-white rounded-lg hover:bg-[#CC4010] transition-colors shrink-0">
              Repor Estoque
            </button>
          </div>
        ))}
      </div>

      {/* Stock table */}
      <div className="bg-white rounded-xl border border-[#E5E5E5]">
        <div className="px-6 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-black text-[#1A1A1A]">Controle de Estoque</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F2F2F2]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Produto</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Atual</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Mínimo</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ponto de Pedido</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide w-40">Nível</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Atualizado em</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide">Ação</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => {
                const pct = getStockPercent(item.atual, item.minimo, item.pedido)
                const isLow = item.atual < item.minimo
                return (
                  <tr key={item.nome} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{item.emoji}</span>
                        <div>
                          <p className="font-semibold text-[#1A1A1A] leading-tight">{item.nome}</p>
                          <p className="text-xs text-[#9E9E9E]">{item.categoria}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-3.5 font-bold text-right ${isLow ? 'text-red-600' : 'text-[#1A1A1A]'}`}>
                      {formatNumber(item.atual)}
                    </td>
                    <td className="px-4 py-3.5 text-[#9E9E9E] text-right">{formatNumber(item.minimo)}</td>
                    <td className="px-4 py-3.5 text-[#9E9E9E] text-right">{formatNumber(item.pedido)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#F2F2F2] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-[#F05A28]'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${isLow ? 'text-red-600' : 'text-[#9E9E9E]'}`}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#9E9E9E]">{item.ultimaAtualizacao}</td>
                    <td className="px-4 py-3.5">
                      <button className="px-3 py-1.5 text-xs font-semibold border border-[#E5E5E5] rounded-lg text-[#1A1A1A] hover:border-[#F05A28] hover:text-[#F05A28] transition-colors">
                        Atualizar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
