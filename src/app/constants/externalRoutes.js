import { Paths } from '../services'

const ExternalRoutes = () => {
  const { backendUrl } = Paths

  const routes = {
    about: () => backendUrl('about'),
    advertisers: () => backendUrl('advertising'),
    articles: () => backendUrl('articles'),
    authors: () => backendUrl('authors'),
    bookStore: () => backendUrl('browse'),
    childrensLiteracy: () => backendUrl('childrens-literacy'),
    litcoins: () => backendUrl('litcoins'),
    login: () => backendUrl('login'),
    media: () => backendUrl('media-page'),
    news: () => backendUrl('news'),
    privacy: () => backendUrl('privacy'),
    providerLogin: ({ provider }) => backendUrl(`accounts/${provider}/login`),
    publishers: () => backendUrl('publishers_enrollment'),
    support: () => 'https://support.readerslegacy.com/', // TODO: until further notice
    terms: () => backendUrl('terms'),
    orders: () => backendUrl('orders'),
    referrals: () => backendUrl('referrals'),
    settings: () => backendUrl('settings'),
    help: () => backendUrl('help'),
    readFeed: () => backendUrl(),
    myBookClubs: () => backendUrl('my-book-clubs'),
    myOrders: () => backendUrl('my-orders'),
    booksWithKen: () => backendUrl('books-with-ken'),
    videoTutorials: () => backendUrl('video-tutorials'),
    games: () => backendUrl('games'),
  }
  return routes
}

export default ExternalRoutes()
