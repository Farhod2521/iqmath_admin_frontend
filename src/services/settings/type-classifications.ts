import { axiosApi } from '@/configs/api'
import { TreeOptionType } from '@/types/option'
import { ApiResponse } from '@/types/response'

export const getSelectorTreeSelect = () =>
  axiosApi.get<ApiResponse<TreeOptionType>>('/settings/type-classifications?type=CONSTRUCTION_OBJECT_TYPES')
