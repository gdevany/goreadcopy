import { CURRENT_READER as A } from '../const/actionTypes'

export function updateLikes(likesCount) {
  // TODO: Need to update likes count for current post on backend, which endpoint?
  return dispatch => {
    dispatch({ type: A.UPDATE_LIKES })
  }
}

export function updateComments(comments) {
  // TODO: Need to update comments for current post on backend, which endpoint?
  return dispatch => {
    dispatch({ type: A.UPDATE_COMMENTS })
  }
}

export function updateShares(sharesCount) {
  // TODO: Need to update share count for current post on backend, which endpoint?
  return dispatch => {
    dispatch({ type: A.UPDATE_SHARES })
  }
}

export default {
  updateLikes,
  updateComments,
  updateShares,
}
