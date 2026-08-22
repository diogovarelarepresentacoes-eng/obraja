const stockItems = [
  { nome: 'Cimento CP-II 50kg', categoryKey: 'cimento', categoria: 'Cimento', atual: 15200, minimo: 5000, pedido: 8000, ultimaAtualizacao: '01/08/2026' },
  { nome: 'Cimento CP-V 50kg', categoryKey: 'cimento', categoria: 'Cimento', atual: 8400, minimo: 3000, pedido: 5000, ultimaAtualizacao: '01/08/2026' },
  { nome: 'Argamassa AC-II 20kg', categoryKey: 'argamassa', categoria: 'Argamassa', atual: 4200, minimo: 2000, pedido: 3000, ultimaAtualizacao: '31/07/2026' },
  { nome: 'Argamassa AC-I 20kg', categoryKey: 'argamassa', categoria: 'Argamassa', atual: 2800, minimo: 2000, pedido: 3000, ultimaAtualizacao: '31/07/2026' },
  { nome: 'Calafetar 300ml', categoryKey: 'vedantes', categoria: 'Vedantes', atual: 1200, minimo: 2000, pedido: 3000, ultimaAtualizacao: '30/07/2026' },
  { nome: 'Tela de Aço 6m × 2,4m', categoryKey: 'ferragens', categoria: 'Ferragens', atual: 320, minimo: 500, pedido: 800, ultimaAtualizacao: '29/07/2026' },
  { nome: 'Telha Cerâmica', categoryKey: 'coberturas', categoria: 'Coberturas', atual: 42000, minimo: 10000, pedido: 20000, ultimaAtualizacao: '28/07/2026' },
  { nome: 'Bloco Cerâmico 9×19×19', categoryKey: 'blocos', categoria: 'Blocos', atual: 180000, minimo: 50000, pedido: 100000, ultimaAtualizacao: '01/08/2026' },
]

const alerts = [
  { nome: 'Calafetar 300ml', atual: 1200, minimo: 2000, unidade: 'un', severity: 'critical' as const },
  { nome: 'Tela de Aço 6m × 2,4m', atual: 320, minimo: 500, unidade: 'pç', severity: 'warning' as const },
]

type CategoryMeta = { color: string; bg: string; icon: React.ReactNode }

const CATEGORY_META: Record<string, CategoryMeta> = {
  cimento: { color: 'text-stone-700', bg: 'bg-stone-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  argamassa: { color: 'text-amber-700', bg: 'bg-amber-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> },
  vedantes: { color: 'text-purple-700', bg: 'bg-purple-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  ferragens: { color: 'text-slate-700', bg: 'bg-slate-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg> },
  coberturas: { color: 'text-orange-700', bg: 'bg-orange-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
  blocos: { color: 'text-red-700', bg: 'bg-red-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg> },
}
const DEFAULT_META: CategoryMeta = { color: 'text-gray-600', bg: 'bg-gray-100', icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg> }
function getCategoryMeta(key: string): CategoryMeta { return CATEGORY_META[key] ?? DEFAULT_META }

function getStockPercent(atual: number, pedido: number): number {
  return Math.min(100, Math.round((atual / (pedido * 2)) * 100))
}

function formatNumber(n: number): string { return n.toLocaleString('pt-BR') }

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
          <p className="text-xs text-[#9E9E9E] mt-1">unidades (todas as linhas)</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
          <p className="text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide mb-1">Alertas Ativos</p>
          <p className="text-3xl font-black text-red-500">2</p>
          <p className="text-xs text-[#9E9E9E] mt-1">requerem atenção imediata</p>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-2.5">
        <h2 className="text-base font-black text-[#1A1A1A]">Alertas de Estoque</h2>
        {alerts.map((a) => (
          <div
            key={a.nome}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border ${
              a.severity === 'critical' ? 'bg-red-50 border-red-200' : 'bg-[#FFFBEB] border-yellow-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                a.severity === 'critical' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className={`font-bold text-sm ${a.severity === 'critical' ? 'text-red-800' : 'text-yellow-800'}`}>{a.nome}</p>
                <p className="text-xs text-[#9E9E9E] mt-0.5">
                  Atual: <span className={`font-semibold ${a.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'}`}>{formatNumber(a.atual)} {a.unidade}</span>
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
              <tr className="border-b border-[#F2F2F2] bg-[#F8F8F8]">
                {['Produto', 'Atual', 'Mínimo', 'Ponto de Pedido', 'Nível', 'Atualizado em', 'Ação'].map(h => (
                  <th key={h} className={`px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide whitespace-nowrap ${h === 'Atual' || h === 'Mínimo' || h === 'Ponto de Pedido' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item) => {
                const meta = getCategoryMeta(item.categoryKey)
                const pct = getStockPercent(item.atual, item.pedido)
                const isLow = item.atual < item.minimo
                return (
                  <tr key={item.nome} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                          {meta.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1A1A1A] leading-tight text-sm">{item.nome}</p>
                          <p className="text-xs text-[#9E9E9E]">{item.categoria}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-4 py-3.5 font-bold text-right text-sm ${isLow ? 'text-red-600' : 'text-[#1A1A1A]'}`}>
                      {formatNumber(item.atual)}
                    </td>
                    <td className="px-4 py-3.5 text-[#9E9E9E] text-right text-sm">{formatNumber(item.minimo)}</td>
                    <td className="px-4 py-3.5 text-[#9E9E9E] text-right text-sm">{formatNumber(item.pedido)}</td>
                    <td className="px-4 py-3.5 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-[#F05A28]'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right shrink-0 ${isLow ? 'text-red-600' : 'text-[#9E9E9E]'}`}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#9E9E9E] whitespace-nowrap">{item.ultimaAtualizacao}</td>
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
