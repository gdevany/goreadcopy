import { CURRENT_READER as A, READERS as B } from '../const/actionTypes'
import initialState from '../../initialState'
import R from 'ramda'

export default (state = initialState.tiles, { type, payload, errors }) => {
  switch (type) {
    case A.GET_READFEED_TILES:
      return {
        ...state,
        readFeed: payload
      }
    case B.GET_PROFILE_TILES:
      return {
        ...state,
        profile: payload
      }
    case B.PREPEND_PROFILE_TILE:
      debugger
      return {
        ...state,
        profile: R.concat([payload], state.profile)
      }
    case B.GET_COMMENTS:
      const isFeedComments = state.feedComments || {}
      return {
        ...state,
        feedComments: {
          ...isFeedComments,
          ...payload
        }
      }
    case B.UPDATE_COMMENTS:
      const existingTilesComments = state.feedComments || {}
      return {
        ...state,
        feedComments: {
          ...existingTilesComments,
          ...payload.newTileComments
        }
      }
    default:
      return state
  }
}
