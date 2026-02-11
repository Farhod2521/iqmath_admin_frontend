import { get, patch } from '@/http/request'

type PanelStatusParamType = {
  limit: number
  page: number
  search: string
}

export type PanelSettingsItemType = {
  code: string
  id: string
  name: string
  order: number
}

export type PanelStatusDataItemType = {
  statusName: number
  statusId: string
  panelSettingsList: PanelSettingsItemType[]
}

type PanelStatusDataType = {
  count: number
  statusesList: PanelStatusDataItemType[]
}

type PanelFormDataType = {
  panelSettingValues: PanelSettingsItemType[]
}

export const getPanel = () => get<PanelStatusDataItemType>('/settings/panel-setting')
export const getPanelStaus = (params: PanelStatusParamType) =>
  get<PanelStatusDataType>('/settings/panel-setting/status', params)

export const getPanelStausId = (id: string) => get(`/settings/panel-setting/status/${id}`)
export const patchPanel = (id: string, data: PanelFormDataType) => patch(`/settings/panel-setting/${id}`, data)
