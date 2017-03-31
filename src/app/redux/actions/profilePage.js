import { PROFILE_PAGE as A, SEARCH as B } from '../const/actionTypes'
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

export function getLibrary({ id, page }) {
  return dispatch => {
    ProfilePage.getLibrary(id, { page })
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
    ProfilePage.currentlyReading(id)
      .then(res => dispatch({ type: A.GET_CURRENTLY_READING, payload: res.data }))
      .catch(err => console.error(`Error in getBookSection ${err}`))
    ProfilePage.getTopBooks(id)
      .then(res => dispatch({ type: A.GET_TOP_BOOKS, payload: res.data }))
      .catch(err => console.error(`Error in getBookSection ${err}`))
  }
}

export function fetchLibrary(id, params) {
  return dispatch => {
    dispatch({ type: A.FETCH_LIBRARY })
    ProfilePage.getLibrary(id, params)
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .catch(err => {
        if (err.response.status !== 404) {
          dispatch({ type: A.GET_LIBRARY, payload: [] })
        }
      })
  }
}

export function addToLibrary(payload, id) {
  const terms = {
    ean: payload,
  }
  return dispatch => {
    ProfilePage.updateLibrary(terms)
      .then(res => {
        if (res.data.results && res.data.results.length) {
          dispatch({ type: B.REMOVE_FROM_BOOK_SEARCH, payload: res.data })
          dispatch({ type: A.ADD_TO_LIBRARY, payload: res.data })
        }
      })
      .catch(err => console.log(`Error in addToLibrary ${err}`))
  }
}

export function removeFromLibrary(payload, id) {
  const terms = {
    id: payload
  }
  return dispatch => {
    ProfilePage.deleteBookLibrary(terms)
      .then(res => dispatch({ type: A.REMOVE_FROM_LIBRARY, payload: payload }))
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

export function deleteTopBooks(payload, id) {
  const terms = {
    id: payload
  }
  return dispatch => {
    ProfilePage.deleteTopBooks(terms)
      .then(() => ProfilePage.getTopBooks(id))
      .then(res => dispatch({ type: A.GET_TOP_BOOKS, payload: res.data }))
      .catch(err => console.log(`Error in deleteTopBooks ${err}`))
  }
}

export function updateTopBooks(payload, id) {
  const terms = {
    id: payload
  }
  return dispatch => {
    ProfilePage.updateTopBooks(terms)
      .then(() => ProfilePage.getTopBooks(id))
      .then(res => dispatch({ type: A.GET_TOP_BOOKS, payload: res.data }))
      .catch(err => console.log(`Error in updateTopBooks ${err}`))
  }
}

export default {
  fetchLibrary,
  getProfilePage,
  getCurrentlyReading,
  getLibrary,
  getTopBooks,
  addToLibrary,
  removeFromLibrary,
  setCurrentlyReading,
  getProfileBookInfo,
  deleteTopBooks,
  updateTopBooks
}
