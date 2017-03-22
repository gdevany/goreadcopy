import http from '../http'
import { Endpoints } from '../../constants'

const { getSidebarAds } = Endpoints

const SidebarAds = () => {
  return {
    getSidebarAds: () => http.get(getSidebarAds())
  }
}

export default SidebarAds()
