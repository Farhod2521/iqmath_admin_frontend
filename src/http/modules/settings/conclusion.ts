import { get, put } from '@/http/request'
import { FieldFormDataType } from './field'
import { StatusNames } from '@/constants/enums'
import { OrganisationType } from './organization'

export type ConclusionDataType = {
  id: string
  userId: string
  organizationCode: string
  organizationId: string
  organizationName: string
  isCompulsory: boolean
  changeGroupsList: string[]
  groupList: FieldFormDataType[]
  property: { id: string; name: string }
  status: { id: string; name: string }
  type: string
  createdAt: string
  userName: string
  performerName: string
  fillinTime: string
  actionTime: string
  adliyaComment?: string
}

type ConclusionsDataType = {
  conclusionList: ConclusionDataType[]
}

export type ChangedfieldsListType = {
  value: string
  valueLabel: string
  name: string
  type: string
  groupId: string
}
export type FieldValuesDataListType = { fieldId: number } & ChangedfieldsListType

export type ConclusionHistoryDataType = {
  conclusionId: string
  actionTime: string
  conclusionType: string
  statusName: string
  fillinTime: string
  changedfieldsList: ChangedfieldsListType[]
  fillerName: string
  performerName: string
}

export type ConclusionTypesCountsDataType = {
  waiting: number
  reject: number
  confirm: number
  total: number
}

export type ConclusionFormDataType = {
  reason: string
  conclusionOrganisationName: string
}

export type PropertiesConclusionsDataType = {
  id: number
  type: string
  actionTime: string
  fillinTime: string
  fieldValuesDataList: FieldValuesDataListType[]
  performerId: number
  performerName: string
  fillerId: number
  userName: string
  organisationId: number
  organisationName: string
  organisationOrder: number
  organisationCode: string
  changeGroupsList: number[]
}

export const getConclusions = (id: string) => get<ConclusionsDataType>('/conclusions/' + id)
export const getConlusionsHistory = (id: string) => get<ConclusionHistoryDataType[]>(`/conclusions/${id}/history`)
export const getPropertieConclusionHistory = (propertyId: number) =>
  get<PropertiesConclusionsDataType[]>(`/properties/${propertyId}/editing/conclusions/histories`)
export const getConclusionTypesCounts = () => get<ConclusionTypesCountsDataType>('/conclusions/types/counts')
export const putConclusion = (id: string, data: ConclusionFormDataType) => put(`/conclusions/${id}`, data)

export type FieldValueListType = {
  id: string
  name: string
  code: string
  value: string
  label: string
}
export type GroupsValueListType = {
  id: string
  code: string
  fieldValueList: FieldValueListType[]
}

export type ConclusionFielsType = {
  id: string
  type: StatusNames
  fillInTime: string
  filler: { id: string; fullName: string }
  organisation: OrganisationType
  groupFieldList: GroupsValueListType[]
}

type ConclusionGroupFielsType = {
  conclusionsList: ConclusionFielsType[]
}
export const getConclusionFields = (id: string) => get<ConclusionGroupFielsType>(`/conclusions/${id}/groups/fields`)
