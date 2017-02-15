import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http

const { currentReader: {
  likedReaders,
  likedAuthors,
  getRecommendation,
  searchRecommendation,
  }
} = Endpoints

const Recommendation = () => {
  return {
    getRecommendation: (params) => http.get(getRecommendation(params)),
    likedReaders: (body) => authenticated().post(likedReaders(), body),
    likedAuthors: (body) => authenticated().post(likedAuthors(), body),
    searchRecommendation: (body) => authenticated().get(searchRecommendation(body)),
  }
}

export default Recommendation()
