function formatSumma(num: string) {
  const [intPart, decimalPart] = num.toString().split('.')
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  if (decimalPart && decimalPart.length > 2) {
    return `${formattedInt}.${decimalPart.slice(0, 2)}`
  }

  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt
}

export default formatSumma
