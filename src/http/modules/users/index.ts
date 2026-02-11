import { get, patch, post, put } from '@/http/request'
import { DistrictType, OrganisationType, PermissionType, RegionType, RoleType } from '../settings'

export const getUserMe = () => get<UserMeType>('/users/me')
export const patchUserMe = (data: UserMeFormDataType) => patch('/users/me/system-theme', data)

export const getUserActive = () => get('/users/active')
export const getUserHistory = (id: string) => get<UsersHistoryType>(`/users/history/${id}`)

export const getUsers = (params: UsersParamType) => get<UsersDataType>('/users', params)
export const getUser = (id: string) => get<UserDataType>(`/users/${id}`)
export const postUser = (data: UserFormDataType) => post('/users', data)
export const putUser = (id: string, data: UserFormDataType) => put(`/users/${id}`, data)
export const putUserPermission = (id: string, data: userFormPermissionType) => patch(`/users/${id}/permissions`, data)
export const getUsersJobs = (id: string) => get<userJobsList>(`/users/${id}/user-jobs`)
export const postUsersSyncUserJobs = (id: string) => post<userJobsList>(`/users/${id}/sync-user-jobs`)
export const getOnlineUsers = () => get<OnlineUsersCountType>('/users/online-users-count')
export const getReportUserExcel = (params: UsersParamType) => get<UserExcelType>('/report/users/excel', params)
export const patchDemontionBlocked = (id: string, data: UsersDemontionBlockedData) =>
  patch(`/users/${id}/demontion-blocked`, data)

type UsersDemontionBlockedData = {
  is_demontion_blocked: boolean
}

type UserExcelType = {
  data: {
    file_content: string
    file_name: string
    file_type: string
  }
}

export type OnlineUsersCountType = {
  totalCount: string
}

export type UserMeFormDataType = {
  systemTheme: string
}

type UsersParamType = {
  limit: number
  page: number
  full_name?: string | null
}

type UsersDataType = {
  count: number
  usersList: UserDataType[]
}

type userJobsList = {
  count: number
  userJobsList: userJobsLists[]
}

export interface userJobsLists {
  id: string
  companyInn: string
  companyName: string
  positionName: string
  startDate: string
  structureName: string
}
export interface UserDataType {
  id: string
  isDemontionBlocked: boolean
  permissionsList: PermissionType[]
  position: {
    id: 1
    role: RoleType
    district: DistrictType
    region: RegionType
    organisation: OrganisationType
    soato: string
    status: boolean
    region_soato: string
    permissionsList: PermissionType[]
  }
  status: boolean
}

interface UserFormDataType {
  role_id?: string
  organisation_id: string
  soato?: string
  region_soato?: string
  status: boolean
}

interface userFormPermissionType {
  permissionsIds?: string[]
}

export interface UserHistoryType {
  id: string
  message: string
  user: { fullName: string }
  staff: { fullName: string }
  createdAt: string
  updatedAt: string
}

export interface UsersHistoryType {
  usersList: UserHistoryType[]
}

export type UserMeType = {
  id: string
  birthDate: string
  citizenship: string
  personAddress: string
  passportIssuePlace: string
  lastName: string
  isChief: boolean
  sex: string
  nationality: string
  passportIssueDate: string
  passportExpirationDate: string
  passportNumber: string
  pinfl: string
  mobilePhoneNumber: string
  oneIdLogin: string
  email: string
  birthPlace: string
  middleName: string
  firstName: string
  fullName: string
  valid: string
  photo: string
  userType: string
  sessionId: string
  lastAuthMethod: string
  legalInfo: string
  position: {
    id: string
    role: RoleType
    organisation: OrganisationType
    region: RegionType
    district: DistrictType
    permissionsList: PermissionType[]
    soato: string
    status: false
  }
  status: boolean
  systemTheme: string
}

export const getUserPeers = () => get('/users/peers')
