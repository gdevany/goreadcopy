import { CURRENT_READER as A, READERS as B } from '../const/actionTypes'
import initialState from '../../initialState'
import R from 'ramda'

export default (state = initialState.tiles, { type, payload, errors }) => {
  switch (type) {
    case A.GET_READFEED_TILES:
      return {
        ...state,
        readFeed: R.concat(state.readFeed || [], payload)
      }
    case B.GET_PROFILE_TILES:
      return {
        ...state,
        profile: R.concat(state.profile || [], payload)
      }
    case B.PREPEND_PROFILE_TILE:
      return {
        ...state,
        profile: R.concat([payload], state.profile)
      }
    case A.PREPEND_READFEED_TILE:
      return {
        ...state,
        readFeed: R.concat([payload], state.readFeed)
      }
    case A.LOCK_READFEED:
      return {
        ...state,
        isReadFeedLocked: payload
      }
    case B.LOCK_PROFILE:
      return {
        ...state,
        isProfileLocked: payload
      }

    case B.EMPTY_TILES:
      return R.empty(state)

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
