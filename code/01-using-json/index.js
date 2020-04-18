export default class Translator {
  constructure(locale, dictionary) {
    this.locale = locale ? locale : 'en';
    this.dictionary = dictionary;
  }
  t = (key) => {
    if (dictionary && dictionary[this.locale]) {
      return dictionary[this.locale][key]
    }
    return (key)
  }
  setLocale = (locale) => this.locale = locale
  getLocale = () => this.locale
}

const i18nFactory = (locale, dictionary) => {
  const client = new Translator(locale, dictionary)
  const t = client.t
  const setLocale = client.setLocale
  const getLocale = client.getLocale
  return {
    t,
    getLocale,
    setLocale
  }
}

const dictionary = {
  en: {
    "label_ok": 'ok'
  },
  fa: {
    "label_ok": 'خوبه'
  }
}

const locale = window.localStorage &&
  window.localStorage.getItem &&
  window.localStorage.getItem('locale') &&

export default i18n = i18nFactory(locale, dictionary);
const Component = () => <h1>{i18n.t('label_ok')}</h1>
