import { get, post, put } from '@/http/request'
import { FieldFormDataType, OptionType } from './field'

type FieldGroupParamType = {
  limit?: number
  page?: number
  search?: string
  groupIds?: string[]
  propertyId?: string
}

type FieldGroupSettingListOptionType = {
  fieldIdsList: string[]
  value: string
}

export type FieldGroupSettingListType = {
  fieldId: string
  type: string
  optionsList: FieldGroupSettingListOptionType[]
}

export type FieldGroupFormDataType = {
  id?: string
  description: string
  isActive: boolean
  name: string
  fieldIds?: string[]
  fieldsList: FieldFormDataType[]
  hasSpecialSettings: boolean
  settingsList?: FieldGroupSettingListType[]
  code?: string
}

type FieldGroupsDataType = {
  count: number
  groupWithFieldList: FieldGroupFormDataType[]
}

export type FieldGroupItem = {
  description: string
  id: string
  name: string
  fieldsList: FieldFormDataType[]
}

type FieldGrouypList = {
  groupWithFieldList: FieldFormDataType[]
}

export const getFieldGroups = (params: FieldGroupParamType) =>
  get<FieldGroupsDataType>('/settings/groups/fields', params)
export const getFieldGroup = (id: String) => get<FieldGroupFormDataType>(`/settings/groups/${id}`)
export const postFieldGroup = (data: FieldGroupFormDataType) => post('/settings/groups', data)
export const putFieldGroup = (id: String, data: FieldGroupFormDataType) => put(`/settings/groups/${id}`, data)

export const getFieldMeta = (status_id?: string) => get<FieldGrouypList>('/settings/groups/by-status', { status_id })

export enum GroupFieldSetting {
  BY_LAW_ACCORDANCE = 'BY_LAW_ACCORDANCE',
  BY_LAND_USE_TYPE = 'BY_LAND_USE_TYPE',
  BY_LAND_FUND_TYPE = 'BY_LAND_FUND_TYPE',
  RE_ARRANGE = 'RE_ARRANGE'
}

export type FGConfigOptionType = {
  value: string
  label: string
  fieldIdsList: string[]
}

export type FGConfigSettingType = {
  fieldId?: string
  id: string | number
  settingType: GroupFieldSetting
  optionsList: FGConfigOptionType[]
  status: boolean
}

export type FGConfigOverviewType = {
  name: string
  type: GroupFieldSetting
  exists: boolean
}

type FGConfigDataType = {
  settingsList: FGConfigSettingType[]
  overviewList: FGConfigOverviewType[]
}

export const getFieldGroupConfig = (id: string) => get<FGConfigDataType>(`/settings/groups/${id}/config`)
export const putFieldGroupConfig = (id: string, data: FGConfigSettingType) => put(`/settings/groups/${id}/config`, data)

export const getFieldGroupConfigs = (id: string) => get<FGConfigDataType>(`/settings/groups/${id}/configs`)
export const putFieldGroupConfigs = (id: string, data: FGConfigSettingType[]) =>
  put(`/settings/groups/${id}/configs`, { groupId: id, settingsList: data })
