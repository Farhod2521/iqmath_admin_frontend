import { get } from '@/http/request'

type StatusesLawAccordanceType = {
  lawAccordance: string
  propertyCount: number
}

export type StatisticsLawAccordanceType = {
  name: string
  soato: string
  id: string
  propertyTotalCount: number
  lawAccordancesStatisticsList: StatusesLawAccordanceType[]
}

type DashboardLawAccordanceType = {
  lawAccordancesList: string[]
  statisticsCountsList: StatisticsLawAccordanceType[]
}

export type DashboardLawAccordanceParamsType = {
  soato: string | number
  by: 'region' | 'district' | 'neighborhood'
  statusId?: string
}

export const getDashboardLawAccordanceRegion = () =>
  get<DashboardLawAccordanceType>('/dashboard/properties/law-accordance-count', { soato: 0, by: 'region' })
export const getDashboardLawAccordanceDistrict = (soato: string) =>
  get<DashboardLawAccordanceType>('/dashboard/properties/law-accordance-count', { soato, by: 'district' })
export const getDashboardLawAccordanceNeighboard = (soato: string) =>
  get<DashboardLawAccordanceType>('/dashboard/properties/law-accordance-count', { soato, by: 'neighborhood' })

export const getDashboardLawAccordance = (params: DashboardLawAccordanceParamsType) =>
  get<DashboardLawAccordanceType>('/dashboard/properties/law-accordance-count', params)

export const getDashboardLawAccordancePublic = (params: DashboardLawAccordanceParamsType) =>
  get<DashboardLawAccordanceType>('/dashboard/properties/law-accordance-count/public', params)
