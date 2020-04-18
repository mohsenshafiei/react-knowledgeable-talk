export default class Translator {
  constructure(locale) {
    this.locale = locale ? locale : 'en';
    this.dictionary = {};
    this.collections = new Set();
    this.pendingCollections = new Map();
  }

  t = (key) => {
    if (isEmpty(dictionary)) return key;
    if (dictionary.hasOwnProperty(key)) {
      return dictionary[key]
    }
    return key;
  }

  fetchCollection = async (collectionId) => {
    if (this.collections.has(collectionId)) return;
    if (!this.pendingCollections.has(collectionId))
      this.pendingCollections.set(
        collectionId,
        _downloadTranslationCollection(collectionId)
      );
    return pendingCollections.get(collectionId);
  }

  _downloadCollection = async (collectionId) => {
    const path = createPath(collectionId)
    const result = await fetch(path);
    if (result.status === 200) {
      Object.assign(dictionary, result.dictionary);
      this.collections.add(collectionId);
    }
    this.pendingCollections.delete(collectionId);
  }

  useCollections = (collectionId) => {
    if (this.collections.has(collectionId)) return
    throw new Promise(fetchCollection(collectionId))
  };
}


const i18nFactory = (locale) => {
  const client = new Translator(locale);
  const t = client.t;
  const fetchCollection = client.fetchCollection;
  const useCollections = client.useCollections;
  return {
    t,
    fetchCollection
    useCollections,
  }
}

const i18n = i18nFactory('en')
const App = () => {
  const locale = 'en'
  return (
    <>
      <Suspense fallback={<h1>Loading Page1...</h1>}>
        <Page1 />
      </Suspense>
      <Suspense fallback={<h1>Loading Page2...</h1>}>
        <Page2 />
      </Suspense>
      <Suspense fallback={<h1>Loading Page3...</h1>}>
        <Page3 />
      </Suspense>
    </>
  )
}

const Page1 = () => {
  useCollections(1);
  return (<h1>{i18n.t('label_1')}</h1>)
}

const Page2 = () => {
  useCollections(2);
  return (<h1>{i18n.t('label_2')}</h1>)
}

const Page1 = () => {
  useCollections(3);
  return (<h1>{i18n.t('label_3')}</h1>)
}
