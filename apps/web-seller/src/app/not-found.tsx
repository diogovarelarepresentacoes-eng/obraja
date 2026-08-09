import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <p className="text-7xl font-black text-[#F05A28] mb-4">404</p>
        <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">Página não encontrada</h1>
        <p className="text-[#9E9E9E] text-sm mb-8 leading-relaxed">
          A página que você procura não existe ou foi removida.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#F05A28] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#CC4010] transition-[background-color,transform] duration-150 active:scale-[0.97]"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
