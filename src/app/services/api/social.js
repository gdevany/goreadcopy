import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { sharePost } = Endpoints

const Social = () => {
  return {
    sharePost: (id, body) => authenticated().post(sharePost(id), body),
  }
}

export default Social()
