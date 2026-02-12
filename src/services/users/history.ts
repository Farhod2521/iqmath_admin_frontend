import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export type UserHistoryData = {
  changedBy: string
  message: string
  timestamp: string
}

export const getUserHistory = (userId: string) => axiosApi.get<ApiResponse<UserHistoryData>>(`/history/users/${userId}`)
