import { axiosApi } from '@/configs/api'
import { Edge } from 'reactflow'

export type NodeComponentsData = {
  id: string
  code: string
  name: string
  status: boolean
  required: boolean
  type: string
}
export type UzkadModuleNodeData = {
  components: NodeComponentsData[]
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  module: number
  purpose: string
  disabled: boolean
  uzkadEndpointCode: string
  name: string
}

export type UzkadDiagramsSendUzkadModuleData = {
  nodes: UzkadModuleNodeData[]
  edges: Edge[]
  module: number
}

export type SendConfigComponents = {
  code: string
  status: boolean
  required: boolean
}

export type UzkadDiagramSendConfigFormData = {
  purpose: string
  position: {
    x: number
    y: number
  }
  uzkadEndpointCode: string
  disabled: boolean
  components: SendConfigComponents[]
}

export const getUzkadDiagramSendUzkadModule = (uzkadModuleId: string) =>
  axiosApi.get<UzkadDiagramsSendUzkadModuleData>(`/uzkad-diagram/send/${uzkadModuleId}`)

export const postUzkadDiagramSendConfig = (uzkadModuleId: string, data: UzkadDiagramSendConfigFormData) =>
  axiosApi.post(`/uzkad-diagram/${uzkadModuleId}/send/config`, data)

export const patchUzkadSendConfig = (uzkadSendConfigId: string, data: UzkadDiagramSendConfigFormData) =>
  axiosApi.patch(`/uzkad-diagram/send/config/${uzkadSendConfigId}`, data)

export const deleteUzkadSendConfig = (configId: string) =>
  axiosApi.delete(`/uzkad-diagram/uzkad-send-config/${configId}`)
