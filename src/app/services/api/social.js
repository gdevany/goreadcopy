import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { sharePost, shareBook } = Endpoints

const Social = () => {
  return {
    sharePost: (id, body) => authenticated().post(sharePost(id), body),
    shareBook: (id, body) => authenticated().post(shareBook(id), body),
  }
}

export default Social()
