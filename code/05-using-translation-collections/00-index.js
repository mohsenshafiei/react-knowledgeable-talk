// Fetch-On-Render

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
  hasDictionary = () => !isEmpty(this.dictionary)
}

const i18nFactory = (locale) => {
  const client = new Translator(locale)
  const t = client.t
  const fetchDictionary = client.fetchDictionary
  return {
    t,
    fetchDictionary,
    hasDictionary,
  }
}

const i18n = i18nFactory('en')
const App = async () => {
  return (<Content />)
}

const Content = async () => {
  const [isReady, setIsReady] = useState(false);
  const path = `https://dictionary.json`
  useEffect(() => {
    i18n.fetchDictionary(path).then(() => setIsReady(true))
  }, [])
  if (isReady && i18n.hasDictionary()) {
    return (<h1>{i18n.t('label_ok')}</h1>)
  }
  return <h1>Loading Page1...</h1>
}
