import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { libraryUpload } = Endpoints

const Import = () => {
  return {
    libraryUpload: (body) => authenticated().post(libraryUpload(), body),
  }
}

export default Import()
