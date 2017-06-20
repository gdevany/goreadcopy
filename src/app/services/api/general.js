import http from '../http'
import { Endpoints } from '../../constants'

const { timesRendered } = Endpoints

const General = () => {
  return {
    timesRendered: () => http.get(timesRendered()),
  }
}

export default General()
