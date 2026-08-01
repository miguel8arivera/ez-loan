export function formatCurrency(value: number): string {
  return `S/. ${value.toLocaleString('en-US')}`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatTerm(months: number): string {
  return `${months} months`;
}
