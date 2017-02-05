import { browserHistory } from 'react-router'
import { REDIRECTS as A } from '../const/actionTypes'
import CurrentReader from './currentReader'

// See explanation in IncomingRedirect component for rationale
export function incoming({ redirectPath, token }) {
  return (dispatch) => {
    dispatch({ type: A.INCOMING_REDIRECT })
    // Since the token was sent via a URL string it is no longer secure. We need
    // to refresh the token as soon as we get it to avoid replay attacks.
    return dispatch(CurrentReader.refreshCurrentReader({ token }))
      .then(() => browserHistory.push(redirectPath))
  }
}

export default {
  incoming,
}
