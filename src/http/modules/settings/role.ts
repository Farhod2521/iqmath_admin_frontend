import { get, post, put } from '@/http/request'

export type RoleFormDataType = {
  organization_id: number
  soato: string
  permissions: number[]
}

export interface RoleDataType extends RoleFormDataType {
  id: number
}

export type RoleType = {
  access: string
  chooseDistrict: boolean
  chooseRegion: boolean
  code: string
  id: string
  name: string
  status: boolean
}

type RolesDataType = {
  count: number
  rolesList: any
}

export const getRoles = () => get<RolesDataType>('/settings/roles')
export const getRole = (id: number) => get<RoleFormDataType>(`/settings/roles/${id}`)
export const patchRole = (id: number, data: RoleFormDataType) => put(`/settings/roles/${id}/permissions`, data)
export const getRolePermission = (id: number) => get(`/settings/roles/${id}/permissions`)
