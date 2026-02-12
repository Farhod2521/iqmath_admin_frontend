import moment from 'moment'

export const formatDate = (d: string) => {
  const m = moment.utc(d)
  return {
    day: m.format('DD'),
    month: m.format('MM'),
    year: m.format('YYYY'),
    hours: m.format('HH'),
    minutes: m.format('mm')
  }
}
