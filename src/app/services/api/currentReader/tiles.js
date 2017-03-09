import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getReadFeedTiles,
    getReadFeedComments,
    getLatestAnnouncement,
    dismissAnnouncement
  }
} = Endpoints

const Tiles = () => {
  return {
    getReadFeedTiles: (body) => authenticated().get(getReadFeedTiles(), body),
    getAnnouncements: () => authenticated().get(getLatestAnnouncement()),
    dismissAnnouncement: (body) => authenticated().post(dismissAnnouncement(), body),
    getReadFeedComments: (id, body) => authenticated().get(getReadFeedComments(id), body)
  }
}

export default Tiles()
