import { get } from '@/http/request'

type StatusesStatisticsListType = {
  id: string
  name: string
  propertyCount: number
  indebtednessCount: number
  rejectMetrCount: number
}

export type StatisticsCountsListType = {
  name: string
  soato: number
  id: string
  propertyTotalCount: number
  statusesStatisticsList: StatusesStatisticsListType[]
}

type DashboardPropertiesType = {
  statusNamesList: string[]
  statisticsCountsList: StatisticsCountsListType[]
}

export enum byRole {
  Region = 'region',
  District = 'district',
  Neighborhood = 'neighborhood'
}

export type DashboardPropertiesParamsType = {
  lawAccordanceId?: string
  soato: number
  by: byRole
}

export enum EnumStates {
  region = 'Viloyatlar',
  district = 'Tumanlar',
  neighborhood = 'Mahallalar'
}

export const getDashboardProperties = (params: DashboardPropertiesParamsType) =>
  get<DashboardPropertiesType>('/dashboard/properties/status-count', { ...params })
