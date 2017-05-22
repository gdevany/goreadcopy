import { Social } from '../../services/api'

export function sharePost(data, contentId) {
  return dispatch => {
    Social.sharePost(contentId, data)
      .catch(err => console.error(`Error in sharePost ${err}`))
  }
}
export default {
  sharePost,
}
