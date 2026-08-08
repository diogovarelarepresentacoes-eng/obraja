'use client'

import Link from 'next/link'
import type { Product } from '../_data/mock'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const CATEGORY_EMOJI: Record<string, string> = {
  Cimento: '🏗️',
  Argamassa: '🪣',
  Tintas: '🎨',
  Ferro: '🔩',
  Tijolos: '🧱',
  Pisos: '🪟',
  Hidráulica: '🚿',
  Elétrica: '⚡',
  EPI: '🪖',
}

type Props = { product: Product; onAdd: (id: string) => void }

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <article
      className="flex-shrink-0 w-44 rounded-2xl overflow-hidden"
      style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #F0F0F0' }}
    >
      <Link href={`/produto/${product.id}`}>
        <div
          className="relative"
          style={{ height: 120, background: 'linear-gradient(135deg, #FFF3EE 0%, #FFE4D6 100%)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-4xl select-none">
            {CATEGORY_EMOJI[product.category] ?? '📦'}
          </div>
          {product.discount > 0 && (
            <span
              className="absolute top-2 left-2 text-white text-xs font-black rounded-full px-2 py-0.5"
              style={{ background: '#F05A28' }}
            >
              -{product.discount}%
            </span>
          )}
        </div>
      </Link>

      <div className="p-3">
        <Link href={`/produto/${product.id}`}>
          <p className="text-xs font-medium leading-tight line-clamp-2" style={{ color: '#1A1A1A' }}>
            {product.name}
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: '#9E9E9E' }}>por {product.unit}</p>
        </Link>

        <div className="mt-2">
          {product.originalPrice > product.price && (
            <p className="text-[10px] line-through" style={{ color: '#9E9E9E' }}>
              {formatBRL(product.originalPrice)}
            </p>
          )}
          <p className="text-sm font-black" style={{ color: '#1A1A1A' }}>
            {formatBRL(product.price)}
          </p>
          <p className="text-[10px]" style={{ color: '#22C55E' }}>
            ou 10x de {formatBRL(product.price / 10)} s/ juros
          </p>
        </div>

        <button
          onClick={() => onAdd(product.id)}
          className="mt-2 w-full py-1.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
          style={{ background: '#F05A28' }}
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          + Adicionar
        </button>
      </div>
    </article>
  )
}
