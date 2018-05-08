import Paths from '../services/paths'

const PopularTopics = () => {
  const { backendUrl } = Paths

  const CATEGORIES = {
    popular: 'POPULAR',
    newest: 'NEWEST',
    // awardWinners: 'AWARD_WINNERS',
    goreadPicks: 'GOREAD_PICKS',
    // sale: 'SALE',
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
    // awardWinners,
    goreadPicks,
    // sale,
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
    // [awardWinners]: 'Award Winners',
    [goreadPicks]: 'GoRead Picks',
    // [sale]: 'Sale',
    [sciFi]: 'Sci-Fi',
    [romance]: 'Romance',
    [youngAdult]: 'Young Adult',
    [sports]: 'Sports',
    [business]: 'Business',
    [cooking]: 'Cooking'
  }

  const categoryUrl = (path) => ('/categories/' + path)

  const routes = {
    [popular]: '/store',
    [newest]: '/store',
    // [awardWinners]: PENDING_URL_FROM_API_TEAM, // Team says it should be hidden for now
    [goreadPicks]: '/store',
    // [sale]: PENDING_URL_FROM_API_TEAM, // Team says it should be hidden for now
    [sciFi]: categoryUrl('fiction/science-fiction-general'),
    [romance]: categoryUrl('fiction/romance-general'),
    [youngAdult]: categoryUrl('juvenile-fiction'),
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
