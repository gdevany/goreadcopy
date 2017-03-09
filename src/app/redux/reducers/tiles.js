import { CURRENT_READER as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.tiles, { type, payload, errors }) => {
  switch (type) {
    case A.GET_READFEED_TILES:
      return {
        ...state,
        readFeed: payload
      }
    case A.GET_PROFILE_TILES:
      return {
        ...state,
        profile: payload
      }
    case A.GET_READFEED_COMMENTS:
      const rfComments = state.readFeedComments || {}
      return {
        ...state,
        readFeedComments: {
          ...rfComments,
          ...payload
        }
      }
    case A.UPDATE_READFEED_COMMENTS:
      const existingTilesComments = state.readFeedComments || {}
      return {
        ...state,
        readFeedComments: {
          ...existingTilesComments,
          ...payload.newTileComments
        }
      }
    default:
      return state
  }
}
