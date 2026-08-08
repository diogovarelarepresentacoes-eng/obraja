'use client'

import { useState } from 'react'

const ROLES: Record<string, { label: string; color: string }> = {
  store: { label: 'Loja', color: 'bg-[#FFF3EE] text-[#F05A28]' },
  industry: { label: 'Indústria', color: 'bg-blue-50 text-blue-700' },
  contractor: { label: 'Construtora', color: 'bg-green-50 text-green-700' },
  consumer: { label: 'Consumidor', color: 'bg-[#F8F8F8] text-[#666]' },
  delivery_own: { label: 'Entregador Próprio', color: 'bg-purple-50 text-purple-700' },
  delivery_third: { label: 'Entregador', color: 'bg-purple-50 text-purple-700' },
  admin: { label: 'Admin', color: 'bg-[#1A1A1A] text-white' },
}

const USERS = [
  { id: '1', name: 'João da Silva Santos', email: 'joao@matsaopaulo.com.br', role: 'store', phone: '(11) 98765-4321', createdAt: '2026-07-15', isActive: true, isVerified: true },
  { id: '2', name: 'Maria das Graças', email: 'maria@cimentorg.com.br', role: 'industry', phone: '(51) 99887-6543', createdAt: '2026-07-20', isActive: true, isVerified: true },
  { id: '3', name: 'Carlos Eduardo Lima', email: 'carlos@bhnorte.com.br', role: 'contractor', phone: '(31) 97654-3210', createdAt: '2026-07-22', isActive: true, isVerified: false },
  { id: '4', name: 'Ana Luiza Ferreira', email: 'ana@email.com', role: 'consumer', phone: '(11) 96543-2109', createdAt: '2026-07-25', isActive: true, isVerified: true },
  { id: '5', name: 'Pedro Henrique Costa', email: 'pedro.entregador@email.com', role: 'delivery_third', phone: '(11) 95432-1098', createdAt: '2026-07-28', isActive: true, isVerified: true },
  { id: '6', name: 'Roberta Souza', email: 'roberta@ferragensbh.com.br', role: 'store', phone: '(31) 94321-0987', createdAt: '2026-07-30', isActive: false, isVerified: true },
  { id: '7', name: 'Marcos Oliveira', email: 'marcos@tubosp.com.br', role: 'industry', phone: '(11) 93210-9876', createdAt: '2026-08-01', isActive: true, isVerified: false },
  { id: '8', name: 'Admin ObraJá', email: 'admin@obraja.com.br', role: 'admin', phone: '(11) 00000-0000', createdAt: '2026-01-01', isActive: true, isVerified: true },
]

export default function UsuariosPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filtered = USERS.filter(u =>
    (roleFilter === 'all' || u.role === roleFilter) &&
    (search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1A1A1A]">Usuários</h1>
        <p className="text-[#9E9E9E] text-sm mt-1">{USERS.length} usuários cadastrados</p>
      </div>

      {/* Role counts */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { role: 'store', count: USERS.filter(u => u.role === 'store').length },
          { role: 'industry', count: USERS.filter(u => u.role === 'industry').length },
          { role: 'contractor', count: USERS.filter(u => u.role === 'contractor').length },
          { role: 'delivery_third', count: USERS.filter(u => u.role.startsWith('delivery')).length },
        ].map(({ role, count }) => (
          <div key={role} className="bg-white rounded-2xl p-4 border border-[#E5E5E5]">
            <div className="text-2xl font-black text-[#1A1A1A]">{count}</div>
            <div className={`text-xs font-bold mt-1 px-2 py-0.5 rounded-full inline-block ${ROLES[role].color}`}>{ROLES[role].label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5] gap-4 flex-wrap">
          <div className="flex gap-1 flex-wrap">
            {[['all', 'Todos'], ['store', 'Lojas'], ['industry', 'Indústrias'], ['contractor', 'Construtoras'], ['delivery_third', 'Entregadores'], ['consumer', 'Consumidores']].map(([key, label]) => (
              <button key={key} onClick={() => setRoleFilter(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${roleFilter === key ? 'bg-[#1A1A1A] text-white' : 'text-[#9E9E9E] hover:text-[#1A1A1A]'}`}>
                {label}
              </button>
            ))}
          </div>
          <input
            placeholder="Buscar nome ou email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 h-9 w-60 bg-[#F8F8F8] rounded-xl text-sm border border-[#E5E5E5] focus:border-[#F05A28] focus:outline-none"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F2F2F2]">
              {['Usuário', 'Perfil', 'Telefone', 'Cadastrado em', 'Status', 'Ações'].map(h => (
                <th key={h} className="text-left text-xs font-bold text-[#9E9E9E] uppercase tracking-wide px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-[#FAFAFA] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F05A28]/10 flex items-center justify-center text-xs font-bold text-[#F05A28]">
                      {u.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1A1A1A]">{u.name}</div>
                      <div className="text-xs text-[#9E9E9E]">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ROLES[u.role]?.color}`}>
                    {ROLES[u.role]?.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#9E9E9E]">{u.phone}</td>
                <td className="px-6 py-4 text-sm text-[#9E9E9E]">{new Date(u.createdAt).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-[#9E9E9E]'}`} />
                    <span className="text-xs text-[#666]">{u.isActive ? 'Ativo' : 'Inativo'}</span>
                    {!u.isVerified && <span className="text-xs text-yellow-600 font-medium">· Não verificado</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-bold text-[#F05A28] hover:underline">Ver</button>
                    <button className="text-xs font-bold text-[#9E9E9E] hover:text-red-500 hover:underline">
                      {u.isActive ? 'Bloquear' : 'Ativar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
