import { axiosApi } from '@/configs/api'

export type SingleUserData = {
  citizenship: string
  email: string
  firstName: string
  id: number
  isChief: boolean
  lastName: string
  middleName: string
  mobilePhoneNumber: string
  oneIdLogin: string
  passportIssueDate: string
  passportIssuePlace: string
  passportNumber: string
  photo: string
  pinfl: string
  status: boolean
  systemTheme: string
  position: UserPosition
}

export type UserPosition = {
  districtSoato: number
  district: {
    name: string
    regionSoato: number
    soato: number
  }
  id: number
  organisation: PositionOrgType
  regionSoato: number
  region: {
    name: string
    soato: number
  }
  role: PositionRoleType
  status: boolean
  stir: string
}

export type PositionOrgType = {
  code: string
  description: string
  fullName: string
  id: number
  shortName: string
  status: boolean
  type: string
}

export type PositionRoleType = {
  access: number
  chooseDistrict: boolean
  chooseRegion: boolean
  code: string
  id: number
  name: string
}

export type UsersFormData = {
  roleId: number
  organisationId: number
  regionSoato: number
  districtSoato: number
  status: boolean
}

export const getSingleUser = (userId: number) => axiosApi.get<SingleUserData>(`/users/${userId}`)
export const putUser = (userId: number, data: UsersFormData) => axiosApi.put(`/users/${userId}`, data)
