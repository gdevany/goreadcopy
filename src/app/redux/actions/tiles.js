import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReaderSocial from '../../services/api/currentReader/social'

export function updateLikes(id, liked) {
  return dispatch => {
    CurrentReaderSocial.updateLikes(id, liked)
      .then(() => dispatch({ type: A.UPDATE_LIKES }))
      .catch((err) => `Error in updateLikes: ${err}`)
  }
}

export function updateComments(comments) {
  return dispatch => {
    CurrentReaderSocial.updateComments(id, liked)
      .then(() => dispatch({ type: A.UPDATE_COMMENTS }))
      .catch((err) => `Error in updateComments: ${err}`)
  }
}

export default {
  updateLikes,
  updateComments,
}
