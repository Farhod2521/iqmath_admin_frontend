import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'
import { XYPosition } from 'reactflow'

export type AuctionDiagramsFormData = {
  module: number
  name: string
  description?: string
  position: XYPosition
}

export type FieldsType = {
  code: string
  auctionCode: string
  required: boolean
  toLatin: boolean
}

export type EdgesType = {
  // id: string
  source: string
  target: string
}

export type AuctionDiagramsData = {
  id: string | number
  module: number
  description?: string
  name: string
}

export type NodesType = {
  id: string
  fields: FieldsType[]
  type: string
  position: {
    x: number
    y: number
  }
  module: number
  name: string
  category: number
  propset: number
  conditionId: string
  conditionName?: string
}

export type NodesReceiveType = {
  id: string
  ijaraFields: string[]
  module: number
  mulkFields: string[]
  name: string
  type: string
  nextStatusId: number
  nextStatusName: string
  historyText: string
  sendTashkent: boolean
  key: string
  actionId: string
  actionName: string
  position: {
    x: number
    y: number
  }
}

export type NodesEdecisionType = {
  id: string
  module: number
  name: string
  actionId: string
  actionName: string
  position: {
    x: number
    y: number
  }
  nextStatusId: number
  nextStatusName: number
  receiveStatusId: number
  receiveStatusName: number
  sendTelekomToUnicon: boolean
  sendToUzkad: boolean
  type: string
}

export type AuctionDiagramsSingleData = {
  nodes: NodesType[]
  edges: EdgesType[]
}

export type AuctionDiagramsReceiveSingleData = {
  nodes: NodesReceiveType[]
  module: number
  edges: EdgesType[]
}

export type AuctionDiagramsEdecisionData = {
  nodes: NodesEdecisionType[]
  edges: EdgesType[]
}

export const getAuctionDiagrams = () => axiosApi.get<ApiResponse<AuctionDiagramsData>>('/settings/auction-diagrams')
export const postAuctionDiagrams = (data: AuctionDiagramsFormData) => axiosApi.post('/settings/auction-diagrams', data)
export const putAuctionDiagrams = (id: string | number, data: AuctionDiagramsFormData) =>
  axiosApi.put(`/settings/auction-diagrams/${id}`, data)

export const getAuctionDiagramsId = (id: string) =>
  axiosApi.get<AuctionDiagramsSingleData>(`/settings/auction-diagrams/send/${id}`)

export const getAuctionDiagramsReceiveId = (id: string) =>
  axiosApi.get<AuctionDiagramsReceiveSingleData>(`/settings/auction-diagrams/receive/${id}`)

export const getAuctionDiagramsEdecisionId = (id: string) =>
  axiosApi.get<AuctionDiagramsEdecisionData>(`/settings/auction-diagrams/edecision/${id}`)
