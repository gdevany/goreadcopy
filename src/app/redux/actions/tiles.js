import { CURRENT_READER as A, READERS as B } from '../const/actionTypes'
import CurrentReaderTiles from '../../services/api/currentReader/tiles'
import ReaderTiles from '../../services/api/tiles'
import R from 'ramda'

export function getReadFeedTiles(page) {
  return dispatch => {
    CurrentReaderTiles.getReadFeedTiles({ page })
    .then(res => dispatch({ type: A.GET_READFEED_TILES, payload: res.data.results }))
    .catch(err => console.error(`Error in getReadFeedTiles: ${err}`))
  }
}

export function getProfileTiles(id, page) {
  return dispatch => {
    ReaderTiles.getProfileTiles(id, { page })
    .then(res => dispatch({ type: B.GET_PROFILE_TILES, payload: res.data.results }))
    .catch(err => console.error(`Error in getProfileTiles: ${err}`))
  }
}

export function getComments(tileId, page, isProfilePage) {
  return dispatch => {
    ReaderTiles.getComments(tileId, { page })
      .then(res => {
        dispatch({
          type: B.GET_COMMENTS,
          payload: { [tileId]: { comments: res.data.results } }
        })
      })
      .catch(err => console.error(`Error in getComments: ${err}`))
  }
}

export function updateComments(tileId, comment, datetime, profile) {
  return (dispatch, getState) => {
    ReaderTiles.updateComments(tileId, { comment })
      .then(() => {
        const existingTilesComments = getState().tiles.feedComments || {}
        const tileInfo = R.prop(tileId, existingTilesComments) || {}
        const commentsForTile = tileInfo.comments || []
        const newComments = R.concat(commentsForTile, [{
          id: tileId,
          comment,
          datetime,
          profile
        }])
        const newTileComments = { [tileId]: { comments: newComments } }
        dispatch({
          type: B.UPDATE_COMMENTS,
          payload: { newTileComments }
        })
      })
      .catch((err) => console.error(`Error in updateComments: ${err}`))
  }
}

export function updateLikes(tileId, liked) {
  return dispatch => {
    ReaderTiles.updateLikes(tileId, { liked })
      .then(() => dispatch({ type: B.UPDATE_LIKES }))
      .catch((err) => console.error(`Error in updateLikes: ${err}`))
  }
}

export default {
  getReadFeedTiles,
  getProfileTiles,
  getComments,
  updateLikes,
  updateComments,
}
