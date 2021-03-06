import { CURRENT_READER as A, READERS as B, default as C } from '../const/actionTypes'
import CurrentReaderTiles from '../../services/api/currentReader/tiles'
import ReaderTiles from '../../services/api/tiles'
import SidebarAds from '../../services/api/ads'
import R from 'ramda'

export function getReadFeedTiles({ adsense, lastAd, timestamp }) {
  return dispatch => {
    dispatch({ type: A.LOCK_READFEED, payload: true })
    CurrentReaderTiles.getReadFeedTiles({ adsense, lastAd, timestamp })
      .then(res => dispatch({ type: A.GET_READFEED_TILES, payload: res.data.results }))
      .then(() => dispatch({ type: A.LOCK_READFEED, payload: false }))
      .catch(err => console.error(`Error in getReadFeedTiles: ${err}`))
    SidebarAds.getSidebarAds()
    .then(res => { dispatch(getSidebarSuccess(res.data))})
    .catch(err => console.error(`Error on Get Sidebar ${err}`))
  }
}

export function getSidebarSuccess(payload) {
  return {
    type: C.GET_SIDEBAR_ADS,
    payload,
  }
}

export function getProfileTiles(id, { timestamp }) {
  return dispatch => {
    dispatch({ type: B.LOCK_PROFILE, payload: true })
    ReaderTiles.getProfileTiles(id, { timestamp })
      .then(res => dispatch({ type: B.GET_PROFILE_TILES, payload: res.data.results }))
      .then(() => dispatch({ type: B.LOCK_PROFILE, payload: false }))
      .catch(err => console.error(`Error in getProfileTiles: ${err}`))
  }
}

export function prependProfileTile(tile) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: B.PREPEND_PROFILE_TILE, payload: tile }))
      .catch(err => console.error(err))
  }
}

export function prependReadFeedTile(tile) {
  return dispatch => {
    return Promise.resolve(dispatch({ type: A.PREPEND_READFEED_TILE, payload: tile }))
      .catch(err => console.error(err))
  }
}

export function emptyTiles() {
  return {
    type: B.EMPTY_TILES,
    payload: []
  }
}

export function shareTile(id, shareType, comment, mentions) {
  if (comment) {
    return dispatch => {
      ReaderTiles.shareTile(id, { shareType, comment, mentions })

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

export function updateComments(tileId, comment, parentId, mentions, datetime, profile) {
  return (dispatch, getState) => {
    ReaderTiles.updateComments(tileId, { comment, parentId, mentions })
      .then((resp) => {
        const data = resp ? resp.data : false
        const commentId = data ? data.commentId : tileId
        const existingTilesComments = getState().tiles.feedComments || {}
        const tileInfo = R.prop(tileId, existingTilesComments) || {}
        const commentsForTile = tileInfo.comments || []
        const mentionArray = data.mentionArray
        const newComment = {
          id: commentId,
          comment,
          mentions,
          mentionArray,
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

export function updateReadfeedTile(tileId, data, editCancel) {
  return dispatch => {
    ReaderTiles.editTile(tileId, data)
      .then((resp) => {
        dispatch({
          type: B.UPDATE_READFEED_TILE,
          payload: {
            id: tileId,
            content: resp.data.results,
          }
        })
      })
      .then(() => editCancel())
      .catch((err) => console.error(`Error in updateReadfeedTile: ${err}`))
  }
}

export function updateProfileTile(tileId, data, editCancel) {
  return dispatch => {
    ReaderTiles.editTile(tileId, data)
      .then((resp) => {
        dispatch({
          type: B.UPDATE_PROFILE_TILE,
          payload: {
            id: tileId,
            content: resp.data.results,
          }
        })
      })
      .then(() => editCancel())
      .catch((err) => console.error(`Error in updateProfileTile: ${err}`))
  }
}

export function deleteReadfeedTile(tileId, deletePost) {
  return dispatch => {
    ReaderTiles.deleteTile(tileId)
      .then(() => deletePost())
      .catch((err) => console.error(`Error in deleteReadfeedTile: ${err}`))
  }
}

export function deleteProfileTile(tileId, deletePost) {
  return dispatch => {
    ReaderTiles.deleteTile(tileId)
      .then(() => deletePost())
      .catch((err) => console.error(`Error in deleteProfileTile: ${err}`))
  }
}

export default {
  getReadFeedTiles,
  getProfileTiles,
  getComments,
  updateLikes,
  updateComments,
  updateReadfeedTile,
  updateProfileTile,
  deleteReadfeedTile,
  deleteProfileTile,
  shareTile,
  prependProfileTile,
  prependReadFeedTile,
  emptyTiles,
  getSidebarSuccess,
}
