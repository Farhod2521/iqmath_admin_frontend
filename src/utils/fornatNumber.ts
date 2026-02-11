export const formatNumber = (num: number | string) => {
  const n = Number(num)
  if (n === 0) return '0'

  if (Number.isInteger(n)) {
    return n.toLocaleString('en-US').replace(/,/g, ' ')
  }

  return n
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    .replace(/,/g, ' ')
}
