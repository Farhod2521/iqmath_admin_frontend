export const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, '')

  if (!digits.startsWith('998')) {
    digits = '998' + digits.replace(/^998/, '')
  }

  digits = digits.slice(0, 12) // 998931234568 (max)

  const parts = ['+998', digits.slice(3, 5), digits.slice(5, 8), digits.slice(8, 10), digits.slice(10, 12)].filter(
    Boolean
  )

  return parts.join('-')
}
