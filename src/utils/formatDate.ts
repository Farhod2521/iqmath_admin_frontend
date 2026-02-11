import moment from 'moment'

export const formatDate = (d: string) => {
  const day = moment(d).format('DD')
  const month = moment(d).format('MM')
  const year = moment(d).format('YYYY')
  const hours = moment(d).format('HH')
  const minutes = moment(d).format('mm')

  return { day, month, year, hours, minutes }
}
