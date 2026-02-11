import { get, post, put } from '@/http/request'

type PermissionParamType = {
  limit: number
  page: number
  search?: string
}

export type PermissionType = {
  id: string
  name: string
  description: string
  code: string
  status: boolean
}

type PermissionsDataType = {
  count: number
  permissionsList: any
}

export const getPermissions = (params: PermissionParamType) => get<PermissionsDataType>('/settings/permissions', params)
export const getPermission = (id: String) => get<PermissionType>(`/settings/permissions/${id}`)
export const postPermission = (data: PermissionType) => post('/settings/permissions', data)
export const putPermission = (id: String, data: PermissionType) => put(`/settings/permissions/${id}`, data)
