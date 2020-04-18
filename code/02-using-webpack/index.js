npm i -D i18n-loader

const dictionary = {
  en: {
    "label_ok": 'ok'
  },
  fa: {
    "label_ok": 'خوبه'
  }
}

plugins: [
  new I18nPlugin(languageConfig, optionsObj)
]

const App = () => console.log(t('label_ok'))
