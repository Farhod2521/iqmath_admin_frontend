import { get, post } from '@/http/request'

type FalconDataType = {
  name: 'ABDULLOX'
  patronym: 'ABDUXOLIQ O‘G‘LI'
  surname: 'MUXAMMADJONOV'
}

type FalconParamsType = {
  passport?: string
  pinfl?: string
  sitr?: string
}

export const getFalcon = (params: FalconParamsType) => post<FalconDataType>('/third-party/falcon', params)
