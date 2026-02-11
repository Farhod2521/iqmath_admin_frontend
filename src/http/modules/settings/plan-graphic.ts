import { get, post } from '@/http/request'

export type FormDaTaPlanGraphicType = {
  neighborhoodId: string
  startDate?: string
  endDate?: string
}

export type DataPlanGraficItemType = {
  soato: string
  name: string
  id: string
  startDate: string
  endDate: string
  regionSoato: string
  districtSoato: string
}

type DataPlanGraficType = {
  planGraphicsList: DataPlanGraficItemType[]
  count: number
}

type PlanGraphicParams = {
  districtSoato: string
  regionSoato: string
  year?: string
  type: string
  limit: number
  page: number
  search?: string
}

export type DataHistories = {
  id: string
  fromData: {
    startDate: string
    endDate: string
  }
  toData: {
    startDate: string
    endDate: string
  }
  createdAt: string
  user: {
    id: string
    full_name: string
  }
}

type PlanGraficHistoryList = {
  histories: DataHistories[]
}

type PlanGraficUsageFormDataType = {
  status: boolean
}

export const postPlanGraphic = (data: FormDaTaPlanGraphicType) => post('/settings/plan-graphic', data)
export const getPlanGraphic = (params: PlanGraphicParams) => get<DataPlanGraficType>('/settings/plan-graphic', params)
export const postPlanGraphicMany = (data: FormDaTaPlanGraphicType[]) =>
  post('settings/plan-graphic/many', { planGraphics: data })

export const getPlanGraphicHistory = (params: DataHistories) =>
  get<PlanGraficHistoryList>('/settings/plan-graphic/histories', params)

export const postPlanGraphicUsage = (data: PlanGraficUsageFormDataType) => post('/settings/plan-graph/usage', data)
export const getPlanGraphicUsage = () => get<PlanGraficUsageFormDataType>('/settings/plan-graph/usage')
