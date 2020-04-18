const plugin_to_use = `gatsby-plugin-i18n`

const locales = [
  `https://www.shopee.com/en`,
  `https://www.shopee.com/sg`,
  `https://www.shopee.com/fa`
]

const files = [
  `src/pages/index.en.js`,
  `src/pages/index.sg.js`,
  `src/pages/index.fa.js`
]

const { locales } = require('./src/data/config')
const isIndexPage = (page, locale) => page.path === `/${locale}`
const is404Page = page => page.path.startsWith('/404')
​
exports.onCreatePage = ({ page, actions }) => {
  const skip = locales.some(locale => isIndexPage(page, locale)) || is404Page(page)
  if (!skip) {
    locales.forEach(locale => {
      const newPage = Object.assign({}, page)
      newPage.path = page.path.replace(/^\//, `/${locale}/`)
      actions.createPage(newPage)
    })
  }
}
