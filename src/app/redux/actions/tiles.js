import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReaderTiles from '../../services/api/currentReader/tiles'
import CurrentReaderSocial from '../../services/api/currentReader/social'

export function getReadFeedTiles(page) {
  return dispatch => {
    CurrentReaderTiles.getReadFeedTiles({ page })
    // TODO: change this to res.data.results
    .then(res => dispatch({ type: A.GET_READFEED_TILES, payload: res.data }))
    .catch(err => `Error in updateLikes: ${err}`)
  }
}

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
  getReadFeedTiles,
  updateLikes,
  updateComments,
}
