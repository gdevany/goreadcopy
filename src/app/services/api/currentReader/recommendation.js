import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http

const { currentReader: {
  likedReaders,
  likedAuthors,
  fanBooks,
  getRecommendation,
  getOnboardingRecommendation,
  getRecommendedAuthors,
  getBookRecommendations,
  getBookClubRecommendations,
  }
} = Endpoints

const Recommendation = () => {
  return {
    getRecommendation: (params) => authenticated().get(getRecommendation(params)),
    getOnboardingRecommendation: (params) => {
      return authenticated().get(getOnboardingRecommendation(params))
    },
    getRecommendedAuthors: (params) => authenticated().get(getRecommendedAuthors(params)),
    getBookRecommendations: (params) => authenticated().get(getBookRecommendations(params)),
    getBookClubRecommendations: (params) => authenticated().get(getBookClubRecommendations(params)),
    likedReaders: (body) => authenticated().post(likedReaders(), body),
    likedAuthors: (body) => authenticated().post(likedAuthors(), body),
    fanBooks: (body) => authenticated().post(fanBooks(), body),
    unfanBooks: (data) => authenticated().delete(fanBooks(), { data }),
    unlikedAuthors: (data) => authenticated().delete(likedAuthors(), { data }),
    unlikedReaders: (data) => authenticated().delete(likedReaders(), { data }),
  }
}

export default Recommendation()
