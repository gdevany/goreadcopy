import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: {
  getReadFeedTiles,
  getLatestAnnouncement,
  dismissAnnouncement }
} = Endpoints

const Tiles = () => {
  return {
    getReadFeedTiles: (body) => authenticated().get(getReadFeedTiles(), body),
    getAnnouncements: () => authenticated().get(getLatestAnnouncement()),
    dismissAnnouncement: (body) => authenticated().post(dismissAnnouncement(), body),
  }
}

export default Tiles()
