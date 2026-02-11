import { post, get } from '@/http/request'

export type FileParamType = {
  fieldId?: string
  isShapeFile?: boolean
  propertyId?: string
}

export type FileListParamType = {
  entityId?: string
  entityType?: string
}

export type FileListDataType = {
  size: number
  filePath: string
}

export type FilesDownloadData = {
  downloadUrl: string
}

export const postFile = (data: Object, params: FileParamType) => post('/files', data, { params })
export const postFileList = (data: Object, params: FileListParamType) =>
  post<FileListDataType[]>('/files/multiple', data, { params })

export const getFilesDownloadLink = (fileName: string) => get<FilesDownloadData>(`/files/download`, { fileName })
