import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const {
  getProfileTiles,
  getComments,
  updateComments,
  updateLikes
} = Endpoints

const Tiles = () => {
  return {
    getProfileTiles: (id, body) => authenticated().get(getProfileTiles(id), body),
    getComments: (id, body) => authenticated().get(getComments(id), body),
    updateComments: (id, body) => authenticated().post(updateComments(id), body),
    updateLikes: (id, body) => authenticated().post(updateLikes(id), body),
  }
}

export default Tiles()
