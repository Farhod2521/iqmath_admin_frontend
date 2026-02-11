export const calculateRemainingTime = (expirationDate: string): string => {
  const now = new Date()
  const deadline = new Date(expirationDate)
  const difference = deadline.getTime() - now.getTime()

  if (difference <= 0) {
    return 'Muddati o‘tdi'
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days} kun`
  if (hours > 0) return `${hours} soat`

  return `${minutes} daqiqa`
}
