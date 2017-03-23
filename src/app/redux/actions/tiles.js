import { CURRENT_READER as A, READERS as B } from '../const/actionTypes'
import CurrentReaderTiles from '../../services/api/currentReader/tiles'
import ReaderTiles from '../../services/api/tiles'
//import { Promise } from '../../services'
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

export function prependProfileTile(tile) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: B.PREPEND_PROFILE_TILE, payload: tile }))
      .catch(err => console.error(err))
  }
}

export function shareTile(id, shareType, comment) {
  if (comment) {
    return dispatch => {
      ReaderTiles.shareTile(id, { shareType, comment })

        .catch(err => console.error(`Error in shareTile: ${err}`))
    }
  }
  return dispatch => {
    ReaderTiles.shareTile(id, { shareType })

      .catch(err => console.error(`Error in shareTile: ${err}`))
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

function addNewComment(comments, newComment, parentId) {
  let found = false
  return comments.map(comment => {
    if (comment.id === parentId) {
      comment.children = R.concat(comment.children, [newComment])
      found = true
    }
    if (!found) {
      comment.children = addNewComment(comment.children, newComment, parentId)
    }
    return comment
  })
}

export function updateComments(tileId, comment, parentId, datetime, profile) {
  return (dispatch, getState) => {
    ReaderTiles.updateComments(tileId, { comment, parentId })
      .then((resp) => {
        const data = resp ? resp.data : false
        const commentId = data ? data.commentId : tileId
        const existingTilesComments = getState().tiles.feedComments || {}
        const tileInfo = R.prop(tileId, existingTilesComments) || {}
        const commentsForTile = tileInfo.comments || []
        const newComment = {
          id: commentId,
          comment,
          datetime,
          profile
        }
        let newComments
        if (parentId) {
          let found = false
          newComments = commentsForTile.map(comment => {
            if (comment.id === parentId) {
              comment.children = R.concat(comment.children, [newComment])
              found = true
            }
            if (!found) {
              comment.children = addNewComment(comment.children, newComment, parentId)
            }
            return comment
          })
        } else {
          newComments = R.concat(commentsForTile, [
            newComment
          ])
        }
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
  shareTile,
  prependProfileTile
}
