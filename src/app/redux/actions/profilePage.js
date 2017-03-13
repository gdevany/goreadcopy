import { PROFILE_PAGE as A } from '../const/actionTypes'
import ProfilePage from '../../services/api/profilePage'

export function getProfilePage(slug) {
  return dispatch => {
    ProfilePage.getProfilePage(slug)
      .then(res => dispatch({ type: A.GET_PROFILE_PAGE, payload: res.data }))
      .catch(err => console.error(`Error in getProfilePage ${err}`))
  }
}

export default {
  getProfilePage,
}
