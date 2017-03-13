import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getFollowers,
    getFollowed,
    updateReadFeedLikes,
    updateReadFeedComments,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => authenticated().get(getFollowers(id), body),
    getFollowed: (id, body) => authenticated().get(getFollowed(id), body),
    updateReadFeedLikes: (id, body) => authenticated().post(updateReadFeedLikes(id), body),
    updateReadFeedComments: (id, body) => authenticated().post(updateReadFeedComments(id), body)
  }
}

export default Social()
