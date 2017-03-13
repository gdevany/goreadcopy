import { default as A } from '../const/actionTypes'
import SidebarAds from '../../services/api/ads'

export function getSidebarAds() {
  return (dispatch) => {
    SidebarAds.getSidebarAds()
    .then(res => { dispatch(getSidebarSuccess(res.data))})
    .catch(err => console.error(`Error on Get Sidebar ${err}`))
  }
}

export function getSidebarSuccess(payload) {
  return {
    type: A.GET_SIDEBAR_ADS,
    payload,
  }
}

export default {
  getSidebarAds,
  getSidebarSuccess,
}
