import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    postMessage,
  }
} = Endpoints

const Posts = () => {
  return {
    postNewMessage: (body) => authenticated().post(postMessage(), body)
  }
}

export default Posts()
