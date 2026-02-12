import { axiosApi } from '@/configs/api'
import { ApiParams, ApiResponse } from '@/types/response'

export type NotificationFormData = {
  title: string
  description: string
  entityType: string
  entityId: number
  senderId: number
  recipientType: number
  recipientIds: number[]
  link: string
}

export type NotificationUpdateData = {
  notificationId?: number
  recipientId?: number
  status?: string
}

export type NotificationData = {
  createdAt: string
  description: string
  entityId: number
  entityType: string
  id: number
  link: string
  status: string
  title: string
}

export const getNotificationMe = (param: ApiParams) =>
  axiosApi.get<ApiResponse<NotificationData>>('/notification/me', param)
export const postNotification = (data: NotificationFormData) => axiosApi.post(`/notification`, data)
export const patchNotification = (data: NotificationUpdateData) => axiosApi.patch(`/notification`, data)
