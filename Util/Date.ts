export function getFormattedDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function getDateMinusDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
} 