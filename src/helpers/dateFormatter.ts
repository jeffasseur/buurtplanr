export const getFormattedDateFromTimestamp = (timestamp: number | Date, timestampFormat: 'ms' | 's' = 's') => {
  const multiplier = timestampFormat === 'ms' ? 1 : 1000
  const date = typeof timestamp === 'number' ? new Date(timestamp * multiplier) : timestamp
  return date.toLocaleDateString('en-GB').replaceAll('/', '.')
}
