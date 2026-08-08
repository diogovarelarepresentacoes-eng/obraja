import Link from 'next/link'
import type { Store } from '../_data/mock'

export default function StoreCard({ store }: { store: Store }) {
  return (
    <Link href={`/loja/${store.id}`} className="block tap-highlight">
      <article
        className="rounded-2xl p-4 transition-all hover:shadow-md"
        style={{ background: '#fff', border: '1px solid #E5E5E5', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center text-2xl font-black"
            style={{ background: '#FFF3EE', color: '#F05A28' }}
          >
            {store.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate" style={{ color: '#1A1A1A' }}>{store.name}</p>
            <p className="text-xs truncate mt-0.5" style={{ color: '#9E9E9E' }}>
              {store.categories.slice(0, 3).join(' · ')}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-bold" style={{ color: '#FFB800' }}>⭐ {store.rating}</span>
              <span className="text-xs" style={{ color: '#9E9E9E' }}>({store.reviews})</span>
              <span className="text-xs" style={{ color: '#9E9E9E' }}>· {store.distance}</span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: '1px solid #F0F0F0' }}
        >
          <div className="flex items-center gap-1">
            <svg width="12" height="12" fill="none" stroke="#9E9E9E" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs" style={{ color: '#9E9E9E' }}>{store.deliveryTime}</span>
          </div>
          {store.freeDelivery ? (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#F0FFF4', color: '#22C55E' }}
            >
              Frete grátis
            </span>
          ) : (
            <span className="text-xs" style={{ color: '#9E9E9E' }}>Mín. {store.minOrder}</span>
          )}
        </div>
      </article>
    </Link>
  )
}
