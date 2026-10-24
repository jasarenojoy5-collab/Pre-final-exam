/**
 * Formats a numeric value into Philippine Peso currency string (e.g. ₱1,250.00)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₱0.00';
  }
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format numbers with thousand separators
 */
export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-PH').format(val);
}

