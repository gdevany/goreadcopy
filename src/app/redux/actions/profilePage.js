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

export function getTopBooks(id) {
  return dispatch => {
    ProfilePage.getTopBooks(id)
      .then(res => dispatch({ type: A.GET_TOP_BOOKS, payload: res.data }))
      .catch(err => console.error(`Error in getTopBooks ${err}`))
  }
}

export function getProfileBookInfo(id) {
  return dispatch => {
    ProfilePage.getLibrary(id)
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .then(() => ProfilePage.currentlyReading(id))
      .then(res => dispatch({ type: A.GET_CURRENTLY_READING, payload: res.data }))
      .then(() => ProfilePage.getTopBooks(id))
      .then(res => dispatch({ type: A.GET_TOP_BOOKS, payload: res.data }))
      .catch(err => console.error(`Error in getBookSection ${err}`))
  }
}

export function addToLibrary(payload, id) {
  const terms = {
    ean: payload,
  }
  return dispatch => {
    ProfilePage.updateLibrary(terms)
      .then(() => ProfilePage.getLibrary(id))
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .catch(err => console.log(`Error in addToLibrary ${err}`))
  }
}

export function removeFromLibrary(payload, id) {
  const terms = {
    id: payload
  }
  return dispatch => {
    ProfilePage.deleteBookLibrary(terms)
      .then(() => ProfilePage.getLibrary(id))
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .catch(err => console.log(`Error in removeFromLibrary ${err}`))
  }
}

export function setCurrentlyReading(payload, id) {
  const terms = {
    id: payload,
  }
  return dispatch => {
    ProfilePage.setCurrentlyReading(terms)
      .then(() => ProfilePage.currentlyReading(id))
      .then(res => dispatch({ type: A.GET_CURRENTLY_READING, payload: res.data }))
      .catch(err => console.log(`Error in currentlyReading ${err}`))
  }
}

export default {
  getProfilePage,
  getCurrentlyReading,
  getLibrary,
  getTopBooks,
  addToLibrary,
  removeFromLibrary,
  setCurrentlyReading,
  getProfileBookInfo
}
