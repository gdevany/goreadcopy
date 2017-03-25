import { PROFILE_PAGE as A } from '../const/actionTypes'
import ProfilePage from '../../services/api/profilePage'

export function getProfilePage(slug, isUserLoggedIn) {
  if (isUserLoggedIn) {
    return dispatch => {
      ProfilePage.getAuthProfilePage(slug)
        .then(res => dispatch({ type: A.GET_PROFILE_PAGE, payload: res.data }))
        .catch(err => console.error(`Error in getProfilePage ${err}`))
    }
  }
  return dispatch => {
    ProfilePage.getProfilePage(slug)
      .then(res => dispatch({ type: A.GET_PROFILE_PAGE, payload: res.data }))
      .catch(err => console.error(`Error in getProfilePage ${err}`))
  }
}

export function getCurrentlyReading(id) {
  return dispatch => {
    ProfilePage.currentlyReading(id)
      .then(res => dispatch({ type: A.GET_CURRENTLY_READING, payload: res.data }))
      .catch(err => console.error(`Error in getCurrentlyReading ${err}`))
  }
}

export function getLibrary(id) {
  return dispatch => {
    ProfilePage.getLibrary(id)
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .catch(err => console.error(`Error in getLibrary ${err}`))
  }
}

export default {
  getProfilePage,
  getCurrentlyReading,
  getLibrary
}
