export function isNight(): boolean {
  const now = new Date()
  if (now.getHours() >= 18 || now.getHours() < 6) {
    return true
  }
  return false
}
