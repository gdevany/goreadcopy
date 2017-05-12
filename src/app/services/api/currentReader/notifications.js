import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getNotifications,
    readNotifications,
  }
} = Endpoints

const Notifications = () => {
  return {
    loadNotifications: () => authenticated().get(getNotifications()),
    setReadNotifications: () => authenticated().post(readNotifications()),
  }
}

export default Notifications()
