import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const {
  getProfileTiles,
  getComments,
  updateComments,
  updateLikes,
  shareTile,
  editProfileTile,
  deleteProfileTile,
} = Endpoints

const Tiles = () => {
  return {
    getProfileTiles: (id, body) => http.get(getProfileTiles(id, body)),
    getComments: (id, body) => authenticated().get(getComments(id), body),
    updateComments: (id, body) => authenticated().post(updateComments(id), body),
    updateLikes: (id, body) => authenticated().post(updateLikes(id), body),
    shareTile: (id, body) => authenticated().post(shareTile(id), body),
    editProfileTile: (id, body) => authenticated().post(editProfileTile(id), body),
    deleteProfileTile: (id) => authenticated().delete(deleteProfileTile(id)),
  }
}

export default Tiles()
