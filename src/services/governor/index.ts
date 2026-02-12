import { axiosApi } from '@/configs/api'

export type GovernorAssistantsFormData = {
  regionSoato: number
  regionName: string
  districtSoato: number
  districtName: string
  neighborhoodId: number
  neighborhoodName: string
  userId: number
  status: boolean
}

export type putGovernorAssistantFormData = {
  userId?: number
  status?: boolean
}

export type GovernorAssistantsRequestData = {
  regionSoato: number
  regionName: string
  districtSoato: number
  districtName: string
  neighborhoodId: number
  neighborhoodName: string
  status: boolean
}
export const postGovernorAssistant = (data: GovernorAssistantsFormData) => axiosApi.post('/governor-assistants', data)
export const getGovernorAssistants = () => axiosApi.get<GovernorAssistantsRequestData>(`/governor-assistants`)
export const getGovernorAssistantId = (id: number) => axiosApi.get(`/governor-assistants/${id}`)

export const putGovernorAssistant = (id: number, data: putGovernorAssistantFormData) =>
  axiosApi.put(`/governor-assistants/${id}`, data)
