import { Paths } from '../services'

const ExternalRoutes = () => {
  const { backendUrl } = Paths

  const routes = {
    bookStore: () => backendUrl('browse'),
    about: () => backendUrl('aboutus-maybe'),
    news: () => backendUrl('news'),
    articles: () => backendUrl('articles'),
    authors: () => backendUrl('authors-maybe'),
    support: () => 'https://support.readerslegacy.com/', // TODO: until further notice
    privacy: () => backendUrl('privacy'),
    terms: () => backendUrl('terms'),
    publishers: () => backendUrl('publishers_enrollment'),
    advertisers: () => backendUrl('advertising'),
    media: () => backendUrl('media-page'),
    childrensLiteracy: () => backendUrl('childrens-literacy'),
    litcoins: () => backendUrl('litcoins')
  }
  return routes
}

export default ExternalRoutes()
