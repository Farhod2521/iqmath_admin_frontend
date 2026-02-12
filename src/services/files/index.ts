import { axiosApi } from '@/configs/api'
import { BASE_URL } from '@/libs/env'

export type FileParamType = {
  field?: string
  isShapeFile?: boolean
  propertyId?: string
}

export type FileDataType = {
  message: string
  filename: string
}

export const postFile = (data: Object, params: FileParamType) =>
  axiosApi.post<FileDataType>(`${BASE_URL}/files`, data, { params })
