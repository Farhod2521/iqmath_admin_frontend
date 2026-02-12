import { axiosApi } from '@/configs/api'
import { ApiResponse } from '@/types/response'

export const getConclusionsOffers = (propertyId: string) =>
  axiosApi.get<ApiResponse<any>>(`/conclusions/property-conclusions/${propertyId}`)
