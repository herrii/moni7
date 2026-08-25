/**
 * Predefined category icons using FontAwesome class names.
 * Grouped into Income & Expense categories for easy selection.
 */
export const CATEGORY_ICONS = [
  // Income Icons
  { value: 'fa-wallet', label: 'Dompet', type: 'income' },
  { value: 'fa-money-bill-wave', label: 'Uang', type: 'income' },
  { value: 'fa-hand-holding-dollar', label: 'Gaji', type: 'income' },
  { value: 'fa-gift', label: 'Hadiah', type: 'income' },
  { value: 'fa-chart-line', label: 'Investasi', type: 'income' },
  { value: 'fa-coins', label: 'Cashback', type: 'income' },
  { value: 'fa-circle-plus', label: 'Lainnya', type: 'income' },

  // Expense Icons
  { value: 'fa-utensils', label: 'Makanan', type: 'expense' },
  { value: 'fa-mug-hot', label: 'Minuman', type: 'expense' },
  { value: 'fa-car', label: 'Mobil', type: 'expense' },
  { value: 'fa-bus', label: 'Transport', type: 'expense' },
  { value: 'fa-gas-pump', label: 'Bensin', type: 'expense' },
  { value: 'fa-cart-shopping', label: 'Belanja', type: 'expense' },
  { value: 'fa-shirt', label: 'Pakaian', type: 'expense' },
  { value: 'fa-file-invoice-dollar', label: 'Tagihan', type: 'expense' },
  { value: 'fa-house', label: 'Rumah', type: 'expense' },
  { value: 'fa-heart-pulse', label: 'Kesehatan', type: 'expense' },
  { value: 'fa-graduation-cap', label: 'Pendidikan', type: 'expense' },
  { value: 'fa-film', label: 'Hiburan', type: 'expense' },
  { value: 'fa-gamepad', label: 'Gaming', type: 'expense' },
  { value: 'fa-tag', label: 'Umum', type: 'expense' },
  { value: 'fa-circle-question', label: 'Lain-lain', type: 'expense' }
] as const

/**
 * Predefined category colors with hex values.
 */
export const CATEGORY_COLORS = [
  { value: '#10b981', label: 'Hijau' },
  { value: '#06b6d4', label: 'Teal' },
  { value: '#3b82f6', label: 'Biru' },
  { value: '#6366f1', label: 'Indigo' },
  { value: '#8b5cf6', label: 'Ungu' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#ef4444', label: 'Merah' },
  { value: '#f97316', label: 'Oranye' },
  { value: '#f59e0b', label: 'Kuning' },
  { value: '#64748b', label: 'Abu' }
] as const

/**
 * Default values for category creation form.
 */
export const CATEGORY_FORM_DEFAULTS = {
  type: 'expense' as const,
  name: '',
  icon: 'fa-tag',
  color: '#00abc8'
} as const
