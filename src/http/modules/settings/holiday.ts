import { del, get, post } from '@/http/request'

export type HolidayParamsType = {
  dateFrom: string
  dateTo: string
}

export type HoliydayItem = {
  id: string
  holidayDate: string
  createdAt: string
  description: string
}

type HolidaysData = {
  holidaysList: HoliydayItem[]
  count: number
}

export type HolidayFormDataType = {
  holiday_date: string
  description: string
}

export const getHolidays = (params: HolidayParamsType) => get<HolidaysData>('/settings/holidays', params)
export const postHoliday = (data: HolidayFormDataType) => post('/settings/holidays', data)
export const deleteHoliday = (id: string) => del(`/settings/holidays/${id}`)
