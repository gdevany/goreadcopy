import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http
const { getProfilePage } = Endpoints

const General = () => {
  return {
    getProfilePage: (slug) => authenticated().get(getProfilePage(slug)),
  }
}

export default General()
