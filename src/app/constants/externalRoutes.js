import { Paths } from '../services'

const ExternalRoutes = () => {
  const { backendUrl } = Paths

  const routes = {
    about: () => backendUrl('about'),
    advertisers: () => backendUrl('advertising'),
    articles: () => 'https://www.goread.com/articles/',
    authors: () => backendUrl('authors'),
    bookStore: () => 'https://www.goread.com/browse/',
    childrensLiteracy: () => 'https://www.goread.com/childrens-literacy',
    litcoins: () => backendUrl('litcoins'),
    login: () => backendUrl('login'),
    media: () => backendUrl('media-page'),
    news: () => 'https://www.goread.com/news/',
    privacy: () => backendUrl('privacy'),
    providerLogin: ({ provider }) => backendUrl(`accounts/${provider}/login`),
    publishers: () => backendUrl('publishers_enrollment'),
    support: () => 'https://support.readerslegacy.com/', // TODO: until further notice
    terms: () => backendUrl('terms'),
    readFeed: () => backendUrl(),
    myBookClubs: () => 'https://www.goread.com/bookclubs/',
    myOrders: () => 'https://www.goread.com/store/orders/',
    booksWithKen: () => 'https://goread.com/bookswithken/',
    videoTutorials: () => 'https://www.goread.com/video-tutorials/',
    referrals: () => 'https://www.goread.com/profile/referrals/',
    games: () => 'https://www.goread.com/games/',
  }
  return routes
}

export default ExternalRoutes()
