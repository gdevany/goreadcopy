import http from '../http'
import { Endpoints } from '../../constants'

const { getProfilePage } = Endpoints

const General = () => {
  return {
    getProfilePage: (slug) => http.get(getProfilePage(slug)),
  }
}

export default General()
