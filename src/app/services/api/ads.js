import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { getSidebarAds } = Endpoints

const SidebarAds = () => {
  return {
    getSidebarAds: () => authenticated().get(getSidebarAds())
  }
}

export default SidebarAds()
