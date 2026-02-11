import { get } from '@/http/request'

export type LawAccordanceType = {
  id: string
  lawArticle: string
  name: string
  shortName: string
  order: number
  code: string
  disabled: boolean
}

type LawAccordanceListType = {
  lawAccordancesList: LawAccordanceType[]
}

export const getLawAccordance = (propertyId?: string) =>
  get<LawAccordanceListType>('/settings/law-accordance', { propertyId })
