'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type DataPoint = { mes: string; valor: number }

function formatCurrency(v: number) {
  return `R$ ${(v / 1000).toFixed(0)}k`
}

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F2F2F2" />
        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 11, fill: '#9E9E9E' }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => [`R$ ${Number(v).toLocaleString('pt-BR')}`, 'GMV']} />
        <Line type="monotone" dataKey="valor" stroke="#F05A28" strokeWidth={2.5} dot={{ fill: '#F05A28', r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
