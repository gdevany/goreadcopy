import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { likedGenres } } = Endpoints

const Genres = () => {
  return {
    createChosenGenres: (body) => authenticated().post(likedGenres(), body),
  }
}

export default Genres()
