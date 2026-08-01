export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function centsToReais(cents: number): number {
  return cents / 100
}

export function reaisToCents(reais: number): number {
  return Math.round(reais * 100)
}
