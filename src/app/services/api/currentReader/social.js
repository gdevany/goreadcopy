import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getFollowers,
    getFollowed,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => authenticated().get(getFollowers(id), body),
    getFollowed: (id, body) => authenticated().get(getFollowed(id), body),
  }
}

export default Social()
