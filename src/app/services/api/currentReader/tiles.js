import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const { currentReader: { getReadFeedTiles } } = Endpoints

const Tiles = () => {
  return {
    getReadFeedTiles: (body) => authenticated().get(getReadFeedTiles(), body),
  }
}

export default Tiles()
