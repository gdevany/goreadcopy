import { default as http } from 'axios'
import endpoints from '../../constants/endpoints'

const { currentReader: { likedReaders, likedAuthors, recommendation } } = endpoints

const Recommendation = {
  findRecommendation: (body) => http.get(recommendation(body)),
  likedReaders: (body) => http.post(likedReaders(), body),
  likedAuthors: (body) => http.post(likedAuthors(), body)
}

export default Recommendation
