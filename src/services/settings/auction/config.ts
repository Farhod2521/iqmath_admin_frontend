import { axiosApi } from '@/configs/api'
import { XYPosition } from 'reactflow'
import { FieldsType } from './diagrams'

export type AuctionDiagramsConfigFormData = {
  conditionId: string
  fields: FieldsType[]
  propset: number
  category: number
  position?: XYPosition
}

export type AuctionDiagramsReceiveConfigFormData = {
  key: string
  position?: XYPosition
  nextStatusId: number
  historyText: string
  sendTashkent: boolean
  actionId: string
  mulkFields: string[]
  ijaraFields: string[]
}

export type AuctionDiagramsReceiveConfigUpdateFormData = {
  mulkFields: string[]
  ijaraFields: string[]
  nextStatusId: number
  historyText: string
  actionId: string
  sendTashkent: boolean
}

export type ReceiveConfigFormData = {
  mulkFields: string[]
  ijaraFields: string[]
}

export const postAuctionDiagramsConfig = (auctionDiagramId: string, data: AuctionDiagramsConfigFormData) =>
  axiosApi.post(`/settings/auction-diagrams/${auctionDiagramId}/send/config`, data)

export const putAuctionDiagramsAuctionConfig = (configId: string, data: AuctionDiagramsConfigFormData) =>
  axiosApi.put(`/settings/auction-diagrams/auction-send-config/${configId}`, data)

export const postAuctionDiagramsReceiveConfig = (auctionModuleId: string, data: AuctionDiagramsReceiveConfigFormData) =>
  axiosApi.post(`/settings/auction-diagrams/${auctionModuleId}/receive/config`, data)

export const putAuctionDiagramsAuctionReceiveConfig = (
  receiveConfigId: string,
  data: AuctionDiagramsReceiveConfigUpdateFormData
) => axiosApi.put(`/settings/auction-diagrams/auction-receive-config/${receiveConfigId}`, data)

export const putReceiveFieldsReceiveConfigId = (receiveConfigId: string, data: ReceiveConfigFormData) =>
  axiosApi.put(`/settings/auction-diagrams/receive-fields/${receiveConfigId}`, data)

export const deleteReceiveFieldsReceiveConfigId = (receiveConfigId: string) =>
  axiosApi.delete(`/settings/auction-diagrams/receive-config/${receiveConfigId}`)
