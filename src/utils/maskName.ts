function maskName(name: string): string {
  if (!name || name.length <= 3) return name
  return name.slice(0, 3) + '*'.repeat(name.length - 3)
}

function maskFullName(fullName: string): string {
  // Har bir so'zni alohida mask qiladi va so'zlarni probel bilan ajratadi
  return fullName.split(' ').map(maskName).join(' ')
}

export { maskName, maskFullName }
