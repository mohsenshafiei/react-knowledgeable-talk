// Fetch-Then-Render

export default class Translator {
  constructure(locale) {
    this.locale = locale ? locale : 'en';
    this.dictionary = {};
  }
  t = (key) => {
    if (isEmpty(this.dictionary)) return key;
    if (this.dictionary.hasOwnProperty(key)) {
      return this.dictionary[key]
    }
    return key;
  }
  fetchDictionary = async (path) => {
    const result = await fetch(path);
    if (result.status === 200) {
      Object.assign(this.dictionary, result.dictionary)
    }
    return {}
  }
}

const i18nFactory = (locale) => {
  const client = new Translator(locale)
  const t = client.t
  const fetchDictionary = client.fetchDictionary
  return {
    t,
    fetchDictionary
  }
}

const i18n = i18nFactory('en')

const init = async () => {
  const path = `https://dictionary.json`
  await i18n.fetchDictionary(path);
  render();
}

const render = () => {
  ReactDOM.render(<App />)
}

const App = async () => {
  return (<h1>{i18n.t('label_ok')}</h1>)
}

init();
