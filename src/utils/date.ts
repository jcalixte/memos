export const toDateString = (date: Date): string => {
  return (
    date
      .toISOString()
      .split('T')
      .shift() || ''
  )
}
