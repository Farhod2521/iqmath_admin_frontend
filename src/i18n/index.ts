import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from './locales/en_US'
import uz_UZB from './locales/uz_UZB'

const resources = {
  en: { translation: en_US },
  uz: { translation: uz_UZB }
}

const lang = localStorage.getItem('locale')

i18n.use(initReactI18next).init({
  resources,
  lng: lang === 'en_US' ? 'en' : 'uz',
  interpolation: {
    escapeValue: false
  }
})
export default i18n
