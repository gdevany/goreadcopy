import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getFollowers,
    getFollowed,
    deleteSocialAccount,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => http.get(getFollowers(id), body),
    getFollowed: (id, body) => http.get(getFollowed(id), body),
    deleteSocialAccount: (id) => authenticated().delete(deleteSocialAccount(id)),
  }
}

export default Social()
