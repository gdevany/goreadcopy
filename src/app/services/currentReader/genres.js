import http from '../http'
import endpoints from '../../constants/endpoints'
const { currentReader: { likedGenres } } = endpoints
const { authenticated } = http

const Genres = () => {
  return {
    createChosenGenres: (body) => authenticated().post(likedGenres(), body),
  }
}

export default Genres()
