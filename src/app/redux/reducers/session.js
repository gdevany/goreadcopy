import R from 'ramda'
import { SESSION as S } from '../const/actionTypes'
import initialState from '../../initialState'

export default (state = initialState.session, { type, payload, errors }) => {
  switch (type) {
    case S.STORE_SESSION:
      return R.merge(state, payload)
    default:
      return state
  }
}
