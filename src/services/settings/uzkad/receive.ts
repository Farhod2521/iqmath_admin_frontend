import { axiosApi } from '@/configs/api'
import { Edge } from 'reactflow'

export type NextStatusType = {
  conditionId: string
  actionId: string
  actionName: string
  relationStatus: boolean
  type: string
}

export type FieldsDataType = {
  uzkadField: string
  fieldCode: string
  required: boolean
  status: boolean
  disabled: boolean
  relationStatus: boolean
  type: string
}

export type AdditionalFieldsType = {
  field: string
  value: string
  valueLabel: string
  disabled: boolean
  relationStatus: boolean
  type: string
}

export type UzkadReceiveNodeData = {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  module: number
  name: string
  purpose: string
  uzkadNextStatusTrue: string
  uzkadNextStatusFalse: string
  messageTrue: string
  messageFalse: string
  nextStatusTrue: NextStatusType[]
  nextStatusFalse: NextStatusType[]
  fieldsTrue: FieldsDataType[]
  fieldsFalse: FieldsDataType[]
  additionalFieldsTrue: AdditionalFieldsType[]
  additionalFieldsFalse: AdditionalFieldsType[]
}

export type UzkadDiagramsReceiveUzkadModuleData = {
  nodes: UzkadReceiveNodeData[]
  edges: Edge[]
  module: number
}

export type UzkadDiagramReceiveConfigFormData = {
  nextStatusTrue: NextStatusFormType[]
  nextStatusFalse: NextStatusFormType[]
  uzkadNextStatusTrue: string
  uzkadNextStatusFalse: string
  messageTrue: string
  messageFalse: string
  fieldsTrue: FieldsFormType[]
  fieldsFalse: FieldsFormType[]
  additionalFieldsTrue: AdditionalFieldsFormType[]
  additionalFieldsFalse: AdditionalFieldsFormType[]
  purpose: string
  uzkadEndpointCode: string
  position?: {
    x: number
    y: number
  }
}

export const getUzkadDiagramReceiveUzkadModule = (uzkadModuleId: string) =>
  axiosApi.get<UzkadDiagramsReceiveUzkadModuleData>(`/uzkad-diagram/receive/${uzkadModuleId}`)

export const postUzkadReceiveConfig = (uzkadModuleId: string, data: UzkadDiagramReceiveConfigFormData) =>
  axiosApi.post(`/uzkad-diagram/${uzkadModuleId}/receive/config`, data)

export const patchUzkadReceiveConfig = (uzkadReceiveConfigId: string, data: UzkadDiagramReceiveConfigFormData) =>
  axiosApi.patch(`/uzkad-diagram/receive/config/${uzkadReceiveConfigId}`, data)

export type NextStatusFormType = {
  conditionId: string
  actionId: string
  actionName: string
}

export type FieldsFormType = {
  uzkadField: string
  fieldCode: string
  required: boolean
  status: boolean
}

export type AdditionalFieldsFormType = {
  field: string
  value: string
  valueLabel: string
}
