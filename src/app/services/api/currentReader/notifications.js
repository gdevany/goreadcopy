import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getNotifications,
  }
} = Endpoints

const Notifications = () => {
  return {
    loadNotifications: () => authenticated().get(getNotifications())
  }
}

export default Notifications()
