export function validateCnpj(cnpj: string): boolean {
  const d = cnpj.replace(/\D/g, '')
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calc = (s: string, w: number[]) => {
    const sum = s.split('').reduce((a, n, i) => a + parseInt(n) * w[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  const d1 = calc(d.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const d2 = calc(d.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return parseInt(d[12]) === d1 && parseInt(d[13]) === d2
}

export function validateFile(file: File): string | null {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) return 'Formato inválido. Use PDF, JPG ou PNG.'
  if (file.size > 10 * 1024 * 1024) return 'Arquivo muito grande. Máximo 10 MB.'
  return null
}
