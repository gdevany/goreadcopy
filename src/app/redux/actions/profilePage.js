import { PROFILE_PAGE as A, SEARCH as B } from '../const/actionTypes'
import { browserHistory } from 'react-router'
import ProfilePage from '../../services/api/profilePage'

export function getProfilePage(slug, isUserLoggedIn) {
  if (isUserLoggedIn) {
    return dispatch => {
      ProfilePage.getAuthProfilePage(slug)
        .then(res => dispatch({ type: A.GET_PROFILE_PAGE, payload: res.data }))
        .catch(() => browserHistory.push('/'))
    }
  }
  return dispatch => {
    ProfilePage.getProfilePage(slug)
      .then(res => dispatch({ type: A.GET_PROFILE_PAGE, payload: res.data }))
      .catch(() => browserHistory.push('/'))
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

export function getWishList(id) {
  return dispatch => {
    ProfilePage.getWishList(id)
      .then(res => dispatch({ type: A.GET_WISH_LIST, payload: res.data }))
      .catch(err => console.error(`Error in getWishList ${err}`))
  }
}

export function addToWishList(payload, id) {
  const terms = {
    ean: payload
  }
  return dispatch => {
    ProfilePage.updateWishList(terms)
      .then(() => ProfilePage.getWishList(id))
      .then(res => dispatch({ type: A.GET_WISH_LIST, payload: res.data }))
      .catch(err => console.log(`Error in getWishList ${err}`))
  }
}

export function removeFromWishList(payload, id) {
  const terms = {
    id: payload
  }
  return dispatch => {
    ProfilePage.deleteFromWishList(terms)
      .then(() => ProfilePage.getWishList(id))
      .then(res => dispatch({ type: A.GET_WISH_LIST, payload: res.data }))
      .catch(err => console.log(`Error in getWishList ${err}`))
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
    ProfilePage.getWishList(id)
      .then(res => dispatch({ type: A.GET_WISH_LIST, payload: res.data }))
      .catch(err => console.error(`Error in getWishList ${err}`))
  }
}

export function fetchLibrary(id, params) {
  return (dispatch) => {
    dispatch({ type: A.FETCH_LIBRARY });
    const request = ProfilePage.getLibrary(id, params);
    request
      .then(res => dispatch({ type: A.GET_LIBRARY, payload: res.data }))
      .catch((err) => {
        if (err.response.status !== 404) {
          dispatch({ type: A.GET_LIBRARY, payload: [] });
        }
      });
    return request;
  };
}

export function addToLibrary(payload, id, context) {
  let terms
  if (context) {
    terms = {
      ean: payload,
      context: context
    }
  } else {
    terms = {
      ean: payload
    }
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
  getWishList,
  addToLibrary,
  removeFromLibrary,
  setCurrentlyReading,
  getProfileBookInfo,
  deleteTopBooks,
  updateTopBooks,
  addToWishList,
  removeFromWishList,
}
