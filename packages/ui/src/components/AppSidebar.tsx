'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

export type SidebarNavItem = {
  href: string
  label: string
  icon: ReactNode
}

export type SidebarUserInfo = {
  initials: string
  name: string
  email: string
}

type AppSidebarProps = {
  navItems: SidebarNavItem[]
  pathname: string
  brandBadge: string
  userInfo: SidebarUserInfo
}

export function AppSidebar({ navItems, pathname, brandBadge, userInfo }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-[240px] min-h-screen bg-[#1A1A1A] shrink-0">
      <div className="px-6 py-6 border-b border-[#2D2D2D]">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span>
            <span className="text-[#F05A28]">Já</span>
          </span>
          <span className="text-[10px] font-bold bg-[#F05A28] text-white px-1.5 py-0.5 rounded uppercase tracking-wide">
            {brandBadge}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#F05A28]/20 text-white'
                  : 'text-[#9E9E9E] hover:bg-[#2D2D2D] hover:text-white'
              }`}
            >
              <span className={`shrink-0 ${isActive ? 'text-[#F05A28]' : ''}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[#2D2D2D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F05A28] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {userInfo.initials}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{userInfo.name}</p>
            <p className="text-[#9E9E9E] text-xs truncate">{userInfo.email}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
