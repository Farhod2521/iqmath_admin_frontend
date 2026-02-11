import { get, post } from '@/http/request'

type PlanEImzoFormDataType = {
  status: boolean
}

export const postEImzoUsage = (data: PlanEImzoFormDataType) => post('/settings/e-imzo/usage', data)
export const getEImzoUsage = () => get<PlanEImzoFormDataType>('/settings/e-imzo/usage')
