import { get } from '@/http/request'

type CountsMonthlyParamsType = {
  year: number
  month: number
}

type CountsMonthlyDataType = {
  daysList: number[]
  propertiesList: number[]
  candidatesList: number[][]
}

export const getDashboardCountsMonthly = (params: CountsMonthlyParamsType) =>
  get<CountsMonthlyDataType>('/dashboard/properties/counts-monthly', params)
