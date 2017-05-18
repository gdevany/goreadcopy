import { CURRENT_READER as A, READERS as B } from '../const/actionTypes'
import initialState from '../../initialState'
import R from 'ramda'

let diff = {}

const updateProfileTile = ({ profile }, { id, content }) => profile.map(p => p.id === id ?
{
  ...p,
  content: content
} : p)

const updateReadfeedTile = ({ readFeed }, { id, content }) => readFeed.map(r => r.id === id ?
{
  ...r,
  content: content
} : r)

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
    case B.UPDATE_PROFILE_TILE:
      diff = {
        ...state,
        profile: updateProfileTile(state, payload)
      }
      return R.merge(state, diff)
    case B.UPDATE_READFEED_TILE:
      diff = {
        ...state,
        readFeed: updateReadfeedTile(state, payload)
      }
      return R.merge(state, diff)
    default:
      return state
  }
}
