/**
 * Currency helper for formatting and parsing Indonesian Rupiah values.
 * All monetary values in the database are stored as integers (no decimals).
 */

/**
 * Formats an integer amount to Indonesian Rupiah string.
 * Example: 125000 → "Rp 125.000"
 */
export function formatCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return `Rp ${formatter.format(amount)}`
}

/**
 * Formats an integer amount to a compact short form.
 * Example: 1500000 → "Rp 1,5jt"
 */
export function formatCurrencyShort(amount: number): string {
  const abs = Math.abs(amount)
  const sign = amount < 0 ? '-' : ''

  if (abs >= 1_000_000_000) {
    const val = abs / 1_000_000_000
    return `${sign}Rp ${val.toFixed(val % 1 === 0 ? 0 : 1)}M`
  }
  if (abs >= 1_000_000) {
    const val = abs / 1_000_000
    return `${sign}Rp ${val.toFixed(val % 1 === 0 ? 0 : 1)}jt`
  }
  if (abs >= 1_000) {
    const val = abs / 1_000
    return `${sign}Rp ${val.toFixed(val % 1 === 0 ? 0 : 1)}rb`
  }

  return `${sign}Rp ${abs}`
}

/**
 * Parses a currency input string to an integer value.
 * Strips non-numeric characters except minus sign.
 * Example: "125.000" → 125000
 * Example: "Rp 50.000" → 50000
 */
export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d-]/g, '')
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? 0 : parsed
}
