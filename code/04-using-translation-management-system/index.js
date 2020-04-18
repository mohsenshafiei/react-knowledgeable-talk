const fetchDictionary = async (path) => {
  const result = await fetch(path);
  return result;
}

const initDictionary = async () => {
  const locale = 'en'
  const dictionaryPath = 'https://my-dictionary-path';
  const dictionary = await fetchDictionary(dictionaryPath)
  const i18n = i18nFactory(locale, dictionary);
  return i18n;
}

const App = async () => {
  const i18n = await initMyDictionary();
  return (<h1>{i18n.t('label_ok')}</h1>)
}
