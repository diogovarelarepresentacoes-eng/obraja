const products = [
  { nome: 'Cimento CP-II 50kg', categoryKey: 'cimento', categoria: 'Cimento', unidade: 'saco', estoque: '15.200', preco: 'R$ 31,90', status: 'Ativo' },
  { nome: 'Cimento CP-V 50kg', categoryKey: 'cimento', categoria: 'Cimento', unidade: 'saco', estoque: '8.400', preco: 'R$ 30,90', status: 'Ativo' },
  { nome: 'Argamassa AC-II 20kg', categoryKey: 'argamassa', categoria: 'Argamassa', unidade: 'cx', estoque: '4.200', preco: 'R$ 37,50', status: 'Ativo' },
  { nome: 'Argamassa AC-I 20kg', categoryKey: 'argamassa', categoria: 'Argamassa', unidade: 'cx', estoque: '2.800', preco: 'R$ 32,00', status: 'Ativo' },
  { nome: 'Calafetar 300ml', categoryKey: 'vedantes', categoria: 'Vedantes', unidade: 'un', estoque: '1.200', preco: 'R$ 15,00', status: 'Ativo' },
  { nome: 'Tela de Aço 6m × 2,4m', categoryKey: 'ferragens', categoria: 'Ferragens', unidade: 'pç', estoque: '320', preco: 'R$ 148,00', status: 'Ativo' },
  { nome: 'Telha Cerâmica', categoryKey: 'coberturas', categoria: 'Coberturas', unidade: 'un', estoque: '42.000', preco: 'R$ 2,90', status: 'Inativo' },
  { nome: 'Bloco Cerâmico 9×19×19', categoryKey: 'blocos', categoria: 'Blocos', unidade: 'un', estoque: '180.000', preco: 'R$ 0,89', status: 'Ativo' },
]

const categories = ['Todas as Categorias', 'Cimento', 'Argamassa', 'Vedantes', 'Ferragens', 'Coberturas', 'Blocos']

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

function getCategoryMeta(key: string): CategoryMeta {
  return CATEGORY_META[key] ?? DEFAULT_META
}

export default function ProdutosPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F05A28] rounded-lg text-sm font-bold text-white hover:bg-[#CC4010] transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Produto
        </button>
      </div>

      {/* Filters + Table */}
      <div className="bg-white rounded-xl border border-[#E5E5E5]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 border-b border-[#F2F2F2]">
          <div className="relative flex-1 w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Buscar produto..."
              className="w-full pl-9 pr-4 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/25"
            />
          </div>
          <select className="px-3 py-2 border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/25 bg-white">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F2F2F2] bg-[#F8F8F8]">
                {['Produto', 'Categoria', 'Unidade', 'Estoque', 'Preço', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#9E9E9E] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const meta = getCategoryMeta(p.categoryKey)
                return (
                  <tr key={p.nome} className="border-b border-[#F2F2F2] hover:bg-[#FAFAFA] transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                          {meta.icon}
                        </div>
                        <span className="font-semibold text-[#1A1A1A]">{p.nome}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>{p.categoria}</span>
                    </td>
                    <td className="px-4 py-3.5 text-[#9E9E9E]">{p.unidade}</td>
                    <td className="px-4 py-3.5 font-semibold text-[#1A1A1A]">{p.estoque}</td>
                    <td className="px-4 py-3.5 font-bold text-[#1A1A1A]">{p.preco}</td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F2F2F2] text-[#9E9E9E]'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#F2F2F2] text-[#9E9E9E] hover:text-[#1A1A1A] transition-colors" title="Editar">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-[#9E9E9E] hover:text-red-600 transition-colors" title="Excluir">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                            <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-[#F2F2F2]">
          <p className="text-sm text-[#9E9E9E]">
            <span className="font-semibold text-[#1A1A1A]">8</span> produtos ·{' '}
            <span className="font-semibold text-[#1A1A1A]">7</span> ativos ·{' '}
            <span className="font-semibold text-[#1A1A1A]">1</span> inativo
          </p>
        </div>
      </div>
    </div>
  )
}
