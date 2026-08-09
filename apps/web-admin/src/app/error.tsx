'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" stroke="#EF4444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">Algo deu errado</h1>
        <p className="text-[#9E9E9E] text-sm mb-8 leading-relaxed">
          {error.message || 'Ocorreu um erro inesperado. Tente novamente.'}
        </p>
        <button
          onClick={reset}
          className="bg-[#F05A28] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#CC4010] transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
