import { axiosApi } from '@/configs/api'
import { ApiParams, ApiResponse } from '@/types/response'

type ListType = {
  id: number
  name: string
}

export type UserParams = {
  search?: string
  organizationId?: number
  roleId?: number
  status?: string
  regionSoato?: number
  districtSoato?: number
} & ApiParams

export type UserData = {
  createdAt: string
  fullName: string
  id: number
  lastAuthMethod: string
  lastLogin: string
  oneIdLogin: string
  organisation: ListType
  region: {
    name: string
    soato: number
  }
  district: {
    name: string
    soato: number
  }
  role: ListType
  status: boolean
}

export type UserApplicantsParams = {
  page: number
  limit: number
  fullName?: string
  passportNumber?: string
  mobilePhoneNumber?: string
  status?: string
}

export type UserApplicantsData = {
  birthDate: string
  fullName: string
  id: number
  mobilePhoneNumber: string
  passportNumber: string
  personAddress: string
}

export type UserOnlineData = {
  onlineUsersCount?: number
}

export const getUsers = (params: UserParams) => axiosApi.get<ApiResponse<UserData>>(`/users`, params)

export const getUsersApplicants = (params: UserApplicantsParams) =>
  axiosApi.get<ApiResponse<UserApplicantsData>>('/users/applicants', params)

export const getUsersOnline = () => axiosApi.get<UserOnlineData>('/users/online')
