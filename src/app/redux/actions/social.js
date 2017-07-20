import { Social } from '../../services/api'
import { getCurrentReader } from './currentReader'

export function sharePost(data, contentId) {
  return dispatch => {
    return Social.sharePost(contentId, data)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.error(`Error in sharePost ${err}`))
  }
}

export function shareBook(data, contentId) {
  return dispatch => {
    return Social.shareBook(contentId, data)
      .then(res => dispatch(getCurrentReader()))
      .catch(err => console.error(`Error in sharePost ${err}`))
  }
}

export default {
  sharePost,
  shareBook,
}
