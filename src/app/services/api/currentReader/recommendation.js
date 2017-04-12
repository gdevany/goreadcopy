import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http

const { currentReader: {
  likedReaders,
  likedAuthors,
  getRecommendation,
  getRecommendedAuthors,
  getBookRecommendations,
  getBookClubRecommendations,
  }
} = Endpoints

const Recommendation = () => {
  return {
    getRecommendation: (params) => authenticated().get(getRecommendation(params)),
    getOnboardingRecommendation: (params) => authenticated().get(getRecommendation(params)),
    getRecommendedAuthors: (params) => authenticated().get(getRecommendedAuthors(params)),
    getBookRecommendations: (params) => authenticated().get(getBookRecommendations(params)),
    getBookClubRecommendations: (params) => authenticated().get(getBookClubRecommendations(params)),
    likedReaders: (body) => authenticated().post(likedReaders(), body),
    likedAuthors: (body) => authenticated().post(likedAuthors(), body),
    unlikedAuthors: (data) => authenticated().delete(likedAuthors(), { data }),
    unlikedReaders: (data) => authenticated().delete(likedReaders(), { data }),
  }
}

export default Recommendation()
