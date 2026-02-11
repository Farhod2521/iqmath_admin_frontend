import { OrganizationCode } from '@/constants/enums'
import { get, post, put } from '@/http/request'

export type OrganisationType = {
  id: string
  shortName: string
  name: string
  inn: string
  order: number
  code: OrganizationCode
  description: string
  fullName: string
  status: boolean
  type: string
  confirmerRoleId?: string
}

export type OrganisationPostType = {}

type OrganisationsDataType = {
  count: number
  organisationsList: OrganisationType[]
}

type OrgParamsType = {
  limit: number
  page: number
  search?: string
}

export const getOrganisations = (params: OrgParamsType) => get<OrganisationsDataType>('/settings/organisations', params)
export const postOrganisation = (data: OrganisationPostType) => post('/settings/organisations', data)
export const getOrganisationId = (id: string) => get<OrganisationType>('/settings/organisations/' + id)
export const putOrganisation = (id: string, data: OrganisationPostType) => put('/settings/organisations/' + id, data)

export const OrganisationCode = {
  PALATA: 'palata',
  GEOINFOCOM: 'geoinfocom',
  DAVAKTIV: 'davaktiv',
  TANLANMAGAN: 'tanlanmagan',
  HOKIMIYAT: 'hokimiyat',
  INVESTITSIYA: 'investitsiya',
  SANITARIYA: 'sanitariya',
  SUV_XOJALIK: 'suv_xojalik',
  FVV: 'fvv',
  HUDUD_ELEKTR: 'hudud_elektr',
  HUDUD_GAZ: 'hudud_gaz',
  EKOLOGIYA: 'ekologiya',
  SOLIQ: 'soliq',
  KOSMOS: 'kosmos',
  QURILISH_UY_JOY: 'qurilish_uy_joy',
  TRANSPORT: 'transport',
  RAQAMLI_TEXNOLOGIYALAR: 'raqamli_texnologiya',
  GEOLOGIYA: 'geologiya',
  UZTELECOM: 'uzbektelecom',
  SUV_TAMINOT: 'suv_taminot',
  KENGASH: 'kengash',
  OZDAV_YERLOYIHA: 'ozdav_yerloyiha',
  ADLIYA: 'adliya',
  KADASTR_AGENTLIK: 'agentlik',
  PROKRATURA: 'prokratura',
  OZAVTOYOL: 'ozavtoyol',
  OZTEMIRYOL: 'oztemiryol',
  OZTRANSGAZ: 'oztransgaz',
  MILLIY_ELEKTR: 'milliy_elektr'
}
