import { get, post, put } from '@/http/request'
import { RoleType } from './role'
import { DistrictType, RegionType } from './division'

export type PositionParamType = {
  limit?: number
  page?: number
  district_soato?: string
  region_soato?: string
  organisation_id?: string
  role_id?: string
}
export interface PositionFormDataType {
  name: string
  code: string
  description: string
  status: boolean
}

export interface PositionDataType extends PositionFormDataType {
  id: string
}

type PositionsDataType = {
  count: number
  positionsList: any
}

export interface PositionsFormDataType {
  role_id: string | undefined
  organisation_id: string | undefined
  soato: string | undefined
  region_soato: string | undefined
  permissions: string[]
  status: boolean
}

interface PositionFromDataType {
  id: 1
  role: RoleType
  district: DistrictType
  region: RegionType
  organisation: any
  permissionsList: any
  soato: string
  status: boolean
  stir: string
  region_soato: string
}

export type ParallelPositionDataType = {
  action: string
  roleId: string
  organisationId: string
  permissionIds?: string[]
}

export const getPositions = (params: PositionParamType) => get<PositionsDataType>('/settings/positions', params)
export const getPosition = (id: string) => get<PositionFromDataType>(`/settings/positions/${id}`)
export const postPosition = (data: PositionsFormDataType) => post('/settings/positions', data)
export const putPosition = (id: string, data: PositionsFormDataType) => put(`/settings/positions/${id}`, data)

export const postParallelPosition = (data: ParallelPositionDataType) => post('/settings/positions/permissions', data)
