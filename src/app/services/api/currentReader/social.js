import http from '../../http'
import { Endpoints } from '../../../constants'

const {
  currentReader: {
    getFollowers,
    getFollowed,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => http.get(getFollowers(id), body),
    getFollowed: (id, body) => http.get(getFollowed(id), body),
  }
}

export default Social()
