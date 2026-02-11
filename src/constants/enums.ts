export enum StatusNames {
  CONFIRM = 'CONFIRM',
  WAITING = 'WAITING',
  REJECT = 'REJECT'
}

export enum StatusValues {
  CONFIRM = 'Ijobiy',
  WAITING = 'Kutilmoqda',
  REJECT = 'Salbiy'
}

const optionConclusionType = [
  { value: 'WAITING', label: 'Xulosa kutilmoqda' },
  { value: 'CONFIRM', label: 'Ijobiy xulosalar' },
  { value: 'REJECT', label: 'Salbiy xulosalar' }
]

export enum StatusInfoNames {
  PROCESSING = '30',
  ANNOUNCEMENT = '6',
  RECOGNIZED = '74',
  KENGASH = '2',
  REJECTED = '3'
}

export enum OrganizationCode {
  ADLIYA = 'adliya',
  SOLIQ = 'soliq',
  INVESTITSIYA = 'investitsiya',
  QURILISH_UY_JOY = 'qurilish_uy_joy',
  SANITARIYA = 'sanitariya',
  SUV_XOJALIK = 'suv_xojalik',
  HOKIMIYAT = 'hokimiyat',
  KENGASH = 'kengash',
  KOSMOS = 'kosmos',
  DAVAKTIV = 'davaktiv',
  EKOLOGIYA = 'ekologiya',
  GEOLOGIYA = 'geologiya',
  SUV_TAMINOT = 'suv_taminot',
  HUDUD_GAZ = 'hudud_gaz',
  HUDUD_ELEKTR = 'hudud_elektr',
  FVV = 'fvv',
  UZBEKTELECOM = 'uzbektelecom',
  OZAVTOYOL = 'ozavtoyol',
  OZTRANSGAZ = 'oztransgaz',
  MILLIY_ELEKTR = 'milliy_elektr',
  OZTEMIRYOL = 'oztemiryol',
  OZDAV_YERLOYIHA = 'ozdav_yerloyiha',
  KANALLAR = 'kanallar_boshqarish',
  OBODONLASH = 'obodonlash',
  PALATA = 'palata',
  GEOINFOCOM = 'geoinfocom',
  AGENTLIK = 'agentlik'
}
