export const DIAGRAM_ID = '66a88a5a0822ae0d06509d35'
export const FIRST_STATUS = '9' // nomzod yaratishda steprolega so'rav jo'natish uchun ishlatildi

export const PARALLEL_STATUS_CODE = 'parallel-conclusion'
export const PARALLEL_TAHRIRLASH_CODE = 'parallel-tahrirlash'
export const SEND_CONCLUSION = 'send-conclusion'
export const ADLIYA_STATUS_CODE = 'adliya-decision'

export const KEYINGI_QADAM = 'NEXT'
export const SAVE_ACTION = 'SAVE'
export const RETURN_TAHRIRLASH = 'RETURN_TAHRIRLASH'
export const SEND_XULOSA = 'SEND_XULOSA'
export const PARALLEL_ACTION = 'PARALLEL_ACTION'
export const RESTORE_PROPERTY = 'RESTORE_PROPERTY'

export const actionTypeList = [
  { label: "Keyingi qadamga o'tkazish", value: KEYINGI_QADAM },
  { label: 'Saqlash', value: SAVE_ACTION },
  { label: "Yerni o'zboshimchaga qaytarish", value: RESTORE_PROPERTY },
  { label: 'Xulosaga yuborish', value: SEND_XULOSA },
  { label: 'Tahrirlashga qaytarish', value: RETURN_TAHRIRLASH },
  { label: 'Muhokamada xulosa berish', value: PARALLEL_ACTION }
]

export enum IndebtedType {
  HAS_DEBT = 'HAS_DEBT',
  NO_DEBT = 'NO_DEBT',
  NOT_CHECKED = 'NOT_CHECKED'
}

export const indebtedList = [
  { label: 'Qarz mavjud', value: IndebtedType.HAS_DEBT },
  { label: 'Qarz mavjud emas', value: IndebtedType.NO_DEBT },
  { label: 'Tekshirilmagan', value: IndebtedType.NOT_CHECKED }
]

export const ObjectTypeData: Record<string, string> = {
  '1': 'Yakka tartibdagi uy-joy',
  '2': 'Koʻp qavatli uydagi xonadon',
  '3': 'Noturar bino yoki inshoot',
  '4': 'Yer uchastkasi',
  '6': "Ko'pxonali uy",
  '13': 'Avtomobil yo’llari uchun ajratilgan yer uchastkasi',
  '14': 'Qishloq xo’jaligiga mo’ljallangan yerlari',
  '15': 'O’rmon xo’jaligi yerlari',
  '16': "Suv xo'jaligi yerlari",
  '17': 'Muhofaza etiladigan tabiiy hududlar',
  '18': 'Davlat zaxira yerlari',
  '19': 'Maxsus uy',
  '20': 'Temir yo’llar',
  '21': 'Davlat tashkilotlaridan ijaraga olingan yer uchastkasi'
}

export const DEPLOYMENT_XULOSA_TIME = '2025-05-13T19:00:24.087Z'
export const DEPLOYMENT_XULOSA_TIME2 = '2025-06-03T18:00:24.087Z'
export const DEPLOYMENT_XULOSA_TIME3 = '2025-06-11T21:12:24.087Z'
export const DEPLOYMENT_XULOSA_TIME4 = '2025-06-13T17:10:24.087Z'
export const DEPLOYMENT_XULOSA_ADLIYA = '2025-07-21T06:00:24.087Z'
