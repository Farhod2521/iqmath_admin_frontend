import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type DefaultFieldsType = {
  fieldId: number
  value: number
  fieldCode: string
}

export type ModuleData = {
  id: number
  name: string
  code: number
  prefix: string
  allowCreate: boolean
  description: string
  initialStatus: number
  maxArea: number
  useAsOfferModule: boolean
  useNeighborhoodSoato: boolean
  performerOrganisation: number
  performerRole: number
  defaultFields: DefaultFieldsType[]
}

export type ModulesFormData = {
  name: string
  description: string
  code: number
  prefix: string
  useNeighborhoodSoato: boolean
  allowCreate: boolean
  initialStatus: number
  useAsOfferModule: boolean
  maxArea: number
  performerOrganisation: number
  performerRole: number
}

export type ModulesUpdateFormData = {
  name: string
  description: string
  allowCreate: boolean
  initialStatus: number
  useAsOfferModule: boolean
  maxArea: number
  performerOrganisation: number
  performerRole: number
}

export type ModulesParams = {
  all?: boolean
}

export const getModules = (params: ModulesParams) => axiosApi.get<ApiResponse<ModuleData>>('/property-modules', params)
export const postModules = (data: ModulesFormData) => axiosApi.post('/property-modules', data)
export const putModules = (code: number, data: ModulesUpdateFormData) => axiosApi.put(`/property-modules/${code}`, data)
