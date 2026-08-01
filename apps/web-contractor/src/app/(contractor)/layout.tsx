import type { ReactNode } from 'react'
import { SidebarNav } from '@/components/contractor/SidebarNav'

export default function ContractorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#F8F8F8' }}>
      <SidebarNav />
      <div className="flex flex-col flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}
