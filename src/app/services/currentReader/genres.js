import { default as http } from 'axios'
import endpoints from '../../constants/endpoints'

const { currentReader: { likedGenres } } = endpoints

const Genres = {
  createChosenGenres: (body) => http.post(likedGenres(), body),
}

export default Genres
