import { get, post } from '@/http/request'

type ActionsPropertyUsageFormDataType = {
  status: boolean
}

export const postActionsPropertyUsage = (data: ActionsPropertyUsageFormDataType) =>
  post('/settings/actions-on-property/usage', data)
export const getActionsPropertyUsage = () =>
  get<ActionsPropertyUsageFormDataType>('/settings/actions-on-property/usage')
