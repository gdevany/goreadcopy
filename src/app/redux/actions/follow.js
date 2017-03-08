import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReaderSocial from '../../services/api/currentReader/social'

export function getFollowers(id, body) {
  return dispatch => {
    CurrentReaderSocial.getFollowers(id, body)
      .then((res) => dispatch({ type: A.GET_FOLLOWERS, payload: res.data }))
      .catch(err => console.log(`Error in getFollowers ${err}`))
  }
}

export function getFollowed(id, body) {
  return dispatch => {
    CurrentReaderSocial.getFollowed(id, body)
      .then((res) => dispatch({ type: A.GET_FOLLOWED, payload: res.data }))
      .catch(err => console.log(`Error in getFollowed ${err}`))
  }
}

export function updateFollowed(followed) {
  // update social
  // TODO: Test if readers isn't overwritten with real data when following new authors
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowed() to get an updated followed array of objects
    })
  }
}

export function updateFollowers(followers) {
  // TODO: update current_reader endpoint or wherever these are saved
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowers() to get an updated followed array of objects
    })
  }
}

export default {
  getFollowers,
  getFollowed,
  updateFollowed,
  updateFollowers,
}
