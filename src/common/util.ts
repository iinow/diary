import moment from 'moment'

export function isNight(): boolean {
  const now = new Date()
  if (now.getHours() >= 18 || now.getHours() < 6) {
    return true
  }
  return false
}

export function yyyyMMdd(): string {
  return moment(new Date()).format('YYYYMMDD')
}
