import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'
import { Edge } from 'reactflow'

export type UzkadDiagramFormData = {
  module: number
  name: string
  position?: {
    x: number
    y: number
  }
}

export type UzkadDiagramsData = {
  id: string
  module: number
  name: string
}

export type ReceiveConditionsData = {
  name: string
  id: string
}

export const postUzkadDiagrams = (data: UzkadDiagramFormData) => axiosApi.post('/uzkad-diagram', data)
export const getUzkadDiagrams = () => axiosApi.get<ApiResponse<UzkadDiagramsData>>('/uzkad-diagram')
export const getUzkadReceiveConditions = () =>
  axiosApi.get<ApiResponse<ReceiveConditionsData>>('/uzkad-diagram/uzkad-receive-conditions')
