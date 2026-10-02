import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './locales/pt.json'
import en from './locales/en.json'
import { readPreference, savePreference } from './utils/storage'

const savedLanguage = readPreference('portfolio-language', 'pt')
i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  supportedLngs: ['pt', 'en'],
  lng: savedLanguage === 'en' ? 'en' : 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false }
})
i18n.on('languageChanged', (language) => savePreference('portfolio-language', language))
export default i18n
