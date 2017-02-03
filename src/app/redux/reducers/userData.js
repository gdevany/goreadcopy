import R from 'ramda'
import { USERS as A } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.userData, { type, payload, errors }) => {
  switch (type) {
    case A.CREATE_READER:
      return payload
    case A.CREATE_READER_SUCCESS:
      return R.mergeAll([
        state,
        payload,
        { submitSuccessful: true }
      ])
    case A.UPDATE_USER_DATA:
      return R.merge(state, payload)
    case A.UPDATE_READER_ERRORS:
      // XXX: this is wrong, we should keep errors under its own key so
      // we can check for presence/absence instead of merging into the
      // existing state...
      return R.merge(state, errors)
    default:
      return state
  }
}
