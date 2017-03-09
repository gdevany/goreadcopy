import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { uploadImage } } = Endpoints

const Images = () => {
  return {
    uploadImage: (body) => authenticated().post(uploadImage(), body),
  }
}

export default Images()
