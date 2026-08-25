/**
 * Predefined account icons using FontAwesome class names.
 */
export const ACCOUNT_ICONS = [
  { value: 'fa-wallet', label: 'Dompet' },
  { value: 'fa-university', label: 'Bank' },
  { value: 'fa-building', label: 'Gedung' },
  { value: 'fa-credit-card', label: 'Kartu' },
  { value: 'fa-money-bill', label: 'Uang' },
  { value: 'fa-coins', label: 'Koin' },
  { value: 'fa-piggy-bank', label: 'Celengan' },
  { value: 'fa-mobile', label: 'HP' },
  { value: 'fa-landmark', label: 'Landmark' },
  { value: 'fa-sack-dollar', label: 'Kantong' },
  { value: 'fa-hand-holding-dollar', label: 'Investasi' },
  { value: 'fa-store', label: 'Toko' }
] as const

/**
 * Predefined account colors with hex values.
 */
export const ACCOUNT_COLORS = [
  { value: '#00abc8', label: 'Teal' },
  { value: '#3b82f6', label: 'Biru' },
  { value: '#10b981', label: 'Hijau' },
  { value: '#f59e0b', label: 'Kuning' },
  { value: '#ef4444', label: 'Merah' },
  { value: '#8b5cf6', label: 'Ungu' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#6366f1', label: 'Indigo' },
  { value: '#14b8a6', label: 'Cyan' },
  { value: '#64748b', label: 'Abu' }
] as const

/**
 * Default values for a new account form.
 */
export const ACCOUNT_FORM_DEFAULTS = {
  name: '',
  balance: 0,
  icon: 'fa-wallet',
  color: '#00abc8'
} as const
