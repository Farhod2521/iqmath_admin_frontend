import { axiosApi } from '@/configs/api'
import { EdgesType } from '../auction'

export type SettingDecisionFormData = {
  receiveStatusId: number
  sendTelekomToUnicon: boolean
  historyText: string
  groupId: string
  actionId: string
  actionName: string
  style: boolean
}

export type DecisionNodeType = {
  id: string
  module: number
  name: string
  actionName: string
  position: {
    x: number
    y: number
  }
  receiveStatusId: number
  receiveStatusName: string
  sendTelekomToUnicon: boolean
  type: string
  style: boolean
  actionId: number
  historyText: string
  groupId: number
  groupName: string
}

export type DecisionDiagramsData = {
  nodes: DecisionNodeType[]
  module: number
  edges: EdgesType[]
}

export const getSettingDecision = (id: string) => axiosApi.get<DecisionDiagramsData>(`/settings/e-decision/${id}`)
export const postSettingDecision = (id: string, data: SettingDecisionFormData) =>
  axiosApi.post(`/settings/e-decision/${id}`, data)
export const putSettingDecision = (id: string, data: SettingDecisionFormData) =>
  axiosApi.put(`/settings/e-decision/${id}`, data)
export const deleteSettingDecision = (id: string) => axiosApi.delete(`/settings/e-decision/${id}`)
