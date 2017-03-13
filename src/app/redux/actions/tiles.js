import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReaderTiles from '../../services/api/currentReader/tiles'
import CurrentReaderSocial from '../../services/api/currentReader/social'
import R from 'ramda'

export function getReadFeedTiles(page) {
  return dispatch => {
    CurrentReaderTiles.getReadFeedTiles({ page })
    .then(res => dispatch({ type: A.GET_READFEED_TILES, payload: res.data.results }))
    .catch(err => console.error(`Error in updateLikes: ${err}`))
  }
}

export function getReadFeedComments(tileId, page) {
  return dispatch => {
    CurrentReaderTiles.getReadFeedComments(tileId, { page })
      .then(res => {
        dispatch({
          type: A.GET_READFEED_COMMENTS,
          payload: { [tileId]: { comments: res.data.results } }
        })
      })
      .catch(err => console.error(`Error in getReadFeedComments: ${err}`))
  }
}

export function updateReadFeedComments(tileId, comment, dateTime, profile) {
  return (dispatch, getState) => {
    CurrentReaderSocial.updateReadFeedComments(tileId, { comment })
      .then(() => {
        const existingTilesComments = getState().tiles.readFeedComments || {}
        const tileInfo = R.prop(tileId, existingTilesComments) || {}
        const commentsForTile = tileInfo.comments || []
        const newComments = R.concat(commentsForTile, [{
          id: tileId,
          comment,
          dateTime,
          profile
        }])
        const newTileComments = { [tileId]: { comments: newComments } }
        dispatch({
          type: A.UPDATE_READFEED_COMMENTS,
          payload: { newTileComments }
        })
      })
      .catch((err) => console.error(`Error in updateComments: ${err}`))
  }
}

export function updateReadFeedLikes(tileId, liked) {
  return dispatch => {
    CurrentReaderSocial.updateReadFeedLikes(tileId, { liked })
      .then(() => dispatch({ type: A.UPDATE_READFEED_LIKES }))
      .catch((err) => console.error(`Error in updateLikes: ${err}`))
  }
}

export default {
  getReadFeedTiles,
  getReadFeedComments,
  updateReadFeedLikes,
  updateReadFeedComments,
}
