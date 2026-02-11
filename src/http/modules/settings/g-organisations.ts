import { get } from '@/http/request'

export type GOrganisationParamType = {
  page: number
  limit: number
  search?: string
}

export type GOrganisationDataType = {
  id: string
  name: string
  shortName: string
  ownership: string
  inn: string
  type: string
  status: boolean
  regionName: string
  districtName: string
  address: string
  higherAuthority: string
  stateShare: string
}

export type GOrganisationListType = {
  gOrganisationsList: GOrganisationDataType[]
  count: number
}

export const getGOrganisations = (params: GOrganisationParamType) =>
  get<GOrganisationListType>('/settings/g-organisations', params)
