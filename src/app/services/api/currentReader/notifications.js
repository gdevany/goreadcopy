import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  currentReader: {
    getNotifications,
    readNotifications,
    dismissNotification,
    dismissAllNotifications,
  }
} = Endpoints

const Notifications = () => {
  return {
    loadNotifications: () => authenticated().get(getNotifications()),
    setReadNotifications: () => authenticated().post(readNotifications()),
    dismissNotification: (params) => authenticated().post(dismissNotification(), params),
    dismissAllNotifications: () => authenticated().post(dismissAllNotifications()),
  }
}

export default Notifications()
