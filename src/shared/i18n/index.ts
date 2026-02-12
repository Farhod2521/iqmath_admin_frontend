import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uz from './uz/common.json'
import ru from './ru/common.json'
import uzc from './uzc/common.json'

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    uzc: { translation: uzc }
  },
  lng: 'uz',
  fallbackLng: 'uz',
  interpolation: { escapeValue: false }
})

export default i18n
