export const math_round = (n: any, l: number = 100) => Math.round(n * l) / l

export const math_sum = (n: number) =>
  new Intl.NumberFormat('en-Us', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    .format(n)
    .replace(/,/g, ' ')
