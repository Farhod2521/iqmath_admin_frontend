import { axiosApi } from '@/configs/api'
import { XYPosition } from 'reactflow'

export const patchAuctionDiagramsNodes = (nodeId: string, data: XYPosition) =>
  axiosApi.patch(`/settings/auction-diagrams/nodes/${nodeId}`, data)
