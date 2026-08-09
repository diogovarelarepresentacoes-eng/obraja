'use client'

import { memo } from 'react'
import type { RefObject } from 'react'

type FileUploadProps = {
  label: string
  required?: boolean
  hint?: string
  file: File | null
  onFile: (f: File | null) => void
  inputRef: RefObject<HTMLInputElement | null>
  accentColor?: 'orange' | 'blue'
}

export const FileUpload = memo(function FileUpload({ label, required, hint, file, onFile, inputRef, accentColor = 'orange' }: FileUploadProps) {
  const borderHover = accentColor === 'blue' ? 'hover:border-blue-400' : 'hover:border-[#F05A28]'
  const textHover = accentColor === 'blue' ? 'hover:text-blue-600' : 'hover:text-[#F05A28]'
  const fileBg = accentColor === 'blue' ? 'bg-blue-50' : 'bg-[#FFF3EE]'
  const fileText = accentColor === 'blue' ? 'text-blue-700' : 'text-[#F05A28]'
  const asterisk = accentColor === 'blue' ? 'text-blue-500' : 'text-[#F05A28]'

  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
        {label} {required && <span className={asterisk}>*</span>}
      </label>
      {hint && <p className="text-xs text-[#9E9E9E] mb-2">{hint}</p>}
      {file ? (
        <div className={`flex items-center justify-between ${fileBg} rounded-xl px-4 py-3`}>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={fileText}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14,2 14,8 20,8" />
            </svg>
            <span className={`text-sm font-medium ${fileText} truncate max-w-[260px]`}>{file.name}</span>
          </div>
          <button type="button" onClick={() => onFile(null)} className="text-xs text-red-400 hover:text-red-600 font-bold ml-2">
            ✕ Remover
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full border-2 border-dashed border-[#E5E5E5] ${borderHover} rounded-xl py-6 px-4 text-center transition-all`}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-2 text-[#9E9E9E]">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          <div className={`text-sm font-semibold text-[#9E9E9E] ${textHover} transition-colors`}>
            Clique para selecionar arquivo
          </div>
          <div className="text-xs text-[#9E9E9E] mt-1">PDF, JPG ou PNG — máx. 10 MB</div>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={e => {
          onFile(e.target.files?.[0] ?? null)
          if (inputRef.current) inputRef.current.value = ''
        }}
      />
    </div>
  )
})
