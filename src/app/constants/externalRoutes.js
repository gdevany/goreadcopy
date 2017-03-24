import { Paths } from '../services'

const ExternalRoutes = () => {
  const { backendUrl } = Paths

  const routes = {
    about: () => backendUrl('about'),
    advertisers: () => backendUrl('advertising'),
    articles: () => backendUrl('articles'),
    authors: () => backendUrl('authors'),
    findAuthors: () => backendUrl('find-authors'),
    bookStore: () => backendUrl('browse'),
    childrensLiteracy: () => backendUrl('childrens-literacy'),
    litcoins: () => backendUrl('litcoins'),
    login: () => backendUrl('login'),
    media: () => backendUrl('media-page'),
    news: () => backendUrl('news'),
    privacy: () => backendUrl('privacy'),
    providerLogin: ({ provider }) => backendUrl(`accounts/${provider}/login`),
    publishers: () => backendUrl('publishers_enrollment'),
    authorEnrollment: () => backendUrl('landing'),
    support: () => 'https://support.readerslegacy.com/', // TODO: until further notice
    terms: () => backendUrl('terms'),
    orders: () => backendUrl('store/orders'),
    referrals: () => backendUrl('profile/referrals'),
    help: () => backendUrl('help'),
    readFeed: () => backendUrl(''),
    myBookClubs: () => backendUrl('bookclubs'),
    myOrders: () => backendUrl('store/orders'),
    booksWithKen: () => backendUrl('bookswithken'),
    videoTutorials: () => backendUrl('video-tutorials'),
    games: () => backendUrl('games'),
    advancedSearch: () => backendUrl('search'),
    editProfile: () => backendUrl('profile/settings'),
    facebookSocialAccount: () => backendUrl('accounts/facebook/login/?process=connect'),
    twitterSocialAccount: () => backendUrl('accounts/twitter/login/?process=connect'),
    googleSocialAccount: () => backendUrl('accounts/google/login/?process=connect'),
    linkedinSocialAccount: () => backendUrl('accounts/linkedin/login/?process=connect'),
  }
  return routes
}

export default ExternalRoutes()
