'use client'

import { memo } from 'react'
import type { ReactNode } from 'react'

export const INPUT = 'w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] bg-white focus:border-[#F05A28] focus:outline-none transition-colors'
export const INPUT_BLUE = 'w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] bg-white focus:border-blue-400 focus:outline-none transition-colors'

type FieldProps = {
  label: string
  required?: boolean
  accentColor?: 'orange' | 'blue'
  children: ReactNode
}

export const Field = memo(function Field({ label, required, accentColor = 'orange', children }: FieldProps) {
  const asterisk = accentColor === 'blue' ? 'text-blue-500' : 'text-[#F05A28]'
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
        {label} {required && <span className={asterisk}>*</span>}
      </label>
      {children}
    </div>
  )
})
