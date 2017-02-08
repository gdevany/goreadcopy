import { Paths } from '../services'

const ExternalRoutes = () => {
  const { backendUrl } = Paths

  const routes = {
    about: () => backendUrl('aboutus-maybe'),
    advertisers: () => backendUrl('advertising'),
    articles: () => backendUrl('articles'),
    authors: () => backendUrl('authors-maybe'),
    bookStore: () => backendUrl('browse'),
    childrensLiteracy: () => backendUrl('childrens-literacy'),
    litcoins: () => backendUrl('litcoins'),
    media: () => backendUrl('media-page'),
    news: () => backendUrl('news'),
    privacy: () => backendUrl('privacy'),
    providerLogin: ({ provider }) => backendUrl(`accounts/${provider}/login`),
    publishers: () => backendUrl('publishers_enrollment'),
    support: () => 'https://support.readerslegacy.com/', // TODO: until further notice
    terms: () => backendUrl('terms'),
  }
  return routes
}

export default ExternalRoutes()
