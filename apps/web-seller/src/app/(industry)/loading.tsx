export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5E5E5]">
            <div className="h-3 bg-[#E5E5E5] rounded w-1/2 mb-3" />
            <div className="h-7 bg-[#E5E5E5] rounded w-2/3 mb-2" />
            <div className="h-2.5 bg-[#E5E5E5] rounded w-1/3" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5]">
          <div className="h-4 bg-[#E5E5E5] rounded w-40" />
        </div>
        <div className="divide-y divide-[#F2F2F2]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="h-3 bg-[#E5E5E5] rounded w-16" />
              <div className="h-3 bg-[#E5E5E5] rounded flex-1" />
              <div className="h-3 bg-[#E5E5E5] rounded w-20" />
              <div className="h-6 bg-[#E5E5E5] rounded-full w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
