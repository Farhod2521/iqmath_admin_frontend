export const compareDate = (time: string, date: string) => {
  if (time) {
    const recodDate = new Date(time)
    const deployDate = new Date(date)
    return deployDate < recodDate
  }
  return false
}
