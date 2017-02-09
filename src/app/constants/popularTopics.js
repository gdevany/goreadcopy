import Paths from '../services/paths'
import ExternalRoutes from './externalRoutes'

const PopularTopics = () => {
  const { bookStore } = ExternalRoutes
  const { backendUrl } = Paths

  const CATEGORIES = {
    popular: 'POPULAR',
    newest: 'NEWEST',
    awardWinners: 'AWARD_WINNERS',
    goreadPicks: 'GOREAD_PICKS',
    audioBooks: 'AUDIOBOOKS',
    textBooks: 'TEXTBOOKS',
    sale: 'SALE',
  }

  const GENRES = {
    sciFi: 'SCI_FI',
    romance: 'ROMANCE',
    youngAdult: 'YOUNG_ADULT',
    sports: 'SPORTS',
    business: 'BUSINESS',
    cooking: 'COOKING',
  }

  const {
    popular,
    newest,
    awardWinners,
    goreadPicks,
    audioBooks,
    textBooks,
    sale,
  } = CATEGORIES

  const {
    sciFi,
    romance,
    youngAdult,
    sports,
    business,
    cooking,
  } = GENRES

  const names = {
    [popular]: 'Popular',
    [newest]: 'Newest',
    [awardWinners]: 'Award Winners',
    [goreadPicks]: 'GoRead Picks',
    [audioBooks]: 'AudioBooks',
    [textBooks]: 'Textbooks',
    [sale]: 'Sale',
    [sciFi]: 'Sci-Fi',
    [romance]: 'Romance',
    [youngAdult]: 'Young Adult',
    [sports]: 'Sports',
    [business]: 'Business',
    [cooking]: 'Cooking'
  }

  const categoryUrl = (path) => backendUrl('book/category/' + path)

  // TODO: replace w/ actual URLs as API team supplies them
  const PENDING_URL_FROM_API_TEAM = '/'

  const routes = {
    [popular]: bookStore(),
    [newest]: PENDING_URL_FROM_API_TEAM,
    [awardWinners]: PENDING_URL_FROM_API_TEAM,
    [goreadPicks]: PENDING_URL_FROM_API_TEAM,
    [audioBooks]: PENDING_URL_FROM_API_TEAM,
    [textBooks]: PENDING_URL_FROM_API_TEAM,
    [sale]: PENDING_URL_FROM_API_TEAM,
    [sciFi]: categoryUrl('fiction'),
    [romance]: categoryUrl('love-amp-romance'),
    [youngAdult]: PENDING_URL_FROM_API_TEAM,
    [sports]: categoryUrl('sports-amp-recreation'),
    [business]: categoryUrl('business-amp-economics'),
    [cooking]: categoryUrl('cooking'),
  }

  return {
    CATEGORIES,
    GENRES,
    routes,
    names,
  }
}

export default PopularTopics()
