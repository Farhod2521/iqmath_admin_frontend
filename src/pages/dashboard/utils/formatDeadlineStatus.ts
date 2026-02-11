export const formatDeadlineStatus = (time: string, deadline: string, status: string) => {
  const now = new Date()
  const deadlineStatus = new Date(deadline)
  const deadlineTime = new Date(time)
  const deadlineWaiting = now.getTime() - deadlineStatus.getTime()
  const deadlineLate = deadlineTime.getTime() - deadlineStatus.getTime()

  switch (status) {
    case 'waiting':
      return dateDays(deadlineWaiting, "muddat o'tdi")
    case 'late':
      return dateDays(deadlineLate, 'kechikdi')
    default:
      return "Noma'lum"
  }
}

const dateDays = (TimesDed: number, status: string) => {
  const days = Math.floor(TimesDed / (1000 * 60 * 60 * 24))
  const hours = Math.floor((TimesDed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((TimesDed % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) return `${days} kun ${status}`
  if (hours > 0) return `${hours} soat ${status}`
  return `${minutes} daqiqa ${status}`
}
