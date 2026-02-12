import { axiosApi } from '@/configs/api'
import { FieldParams, GroupParams } from '../settings'
import { OptionType, OptionTreeType } from '@/types/option'
import { ApiParams, ApiResponse } from '@/types/response'

// Response types

export type StatusesParams = {
  module: number
  search?: string
  forOffer: boolean
}

export type OrganisationsParams = {
  search?: string
} & ApiParams

export type SelectorDistrictsParams = {
  search?: string
  regionSoato?: number
} & ApiParams

export type SelectorNeighborhoodsParams = {
  search?: string
  regionSoato?: number
  districtSoato?: number
} & ApiParams

export type SelectorIntegrationActionsParams = {
  module?: number
  search?: string
} & ApiParams

// API calls
export const getSelectorFields = (params: FieldParams) =>
  axiosApi.get<ApiResponse<OptionType>>('/selector/fields', params)
export const getSelectorGroups = (params: GroupParams) =>
  axiosApi.get<ApiResponse<OptionType>>('/selector/groups', params)
export const getSelectorModules = () => axiosApi.get<ApiResponse<OptionType>>('/selector/modules')

export const getSelectorStatuses = (params: StatusesParams) =>
  axiosApi.get<{ data: OptionType[] }>('/selector/statuses', params)

export const getSelectorRoles = () => axiosApi.get<{ data: OptionType[] }>('/selector/roles')

export const getSelectorOrganisations = (params: OrganisationsParams) =>
  axiosApi.get<{ data: OptionType[]; count: number }>('/selector/organisations', params)

export const getSelectorActionTypes = () => axiosApi.get<{ data: OptionTreeType[] }>('/selector/action-types')
export const getSelectorRegions = (search: string) =>
  axiosApi.get<{ data: OptionType[] }>('/selector/regions', { search })
export const getSelectorDistricts = (params: SelectorDistrictsParams) =>
  axiosApi.get<{ data: OptionType[]; count: number }>('/selector/districts', params)
export const getSelectorNeighborhoods = (params: SelectorNeighborhoodsParams) =>
  axiosApi.get<{ data: OptionType[]; count: number }>('/selector/neighborhoods', params)
export const getSelectorStepConditions = () => axiosApi.get<{ data: OptionType[] }>('/selector/step-conditions')

export const getSelectorIntegrationActions = (params: SelectorIntegrationActionsParams) =>
  axiosApi.get<{ data: OptionType[]; count: number }>('/selector/integration-actions', params)

export const getSelectorForOffer = (soato: number) =>
  axiosApi.get<{ data: OptionType[] }>(`/selector/offer-modules?regionSoato=${soato}`)
