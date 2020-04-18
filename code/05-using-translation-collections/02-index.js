// Render-As-You-Fetch

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
  useDictionary = async (path) => {
    if (this.dictionary) return
    throw new Promise(fetchDictionary(path))
  }
}

const i18nFactory = (locale) => {
  const client = new Translator(locale);
  const t = client.t;
  const fetchDictionary = client.fetchDictionary;
  const useDictionary = client.useDictionary;
  return {
    t,
    fetchDictionary
    useDictionary,
  }
}

const i18n = i18nFactory('en')

const App = () => {
  return (
    <Suspense fallback={<h1>Loading Page1...</h1>}>
      <Content />
    </Suspense>
  )
}

const Content = () => {
  const path = `https://dictionary.json`
  useDictionary(path);
  return (<h1>{i18n.t('label_ok')}</h1>)
}
