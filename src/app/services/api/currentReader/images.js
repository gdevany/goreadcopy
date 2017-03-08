import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { uploadImage } } = Endpoints

const Genres = () => {
  return {
    uploadImage: (body) => authenticated().post(uploadImage(), body),
  }
}

export default Genres()
