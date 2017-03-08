import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getFollowers,
    getFollowed,
    updateLikes,
    updateComments
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => authenticated().get(getFollowers(id), body),
    getFollowed: (id, body) => authenticated().get(getFollowed(id), body),
    updateLikes: (id, body) => authenticated().get(updateLikes(id), body),
    updateComments: (id, body) => authenticated().get(updateComments(id), body)
  }
}

export default Social()
