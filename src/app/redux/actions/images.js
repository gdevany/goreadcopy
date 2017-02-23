import { CURRENT_READER as A } from '../const/actionTypes'

export function uploadProfileImage(file) {
  // TODO: call a promise here to upload image to endpoint
  return dispatch => {
    dispatch({
      type: A.UPLOAD_IMAGE
    })
  }
}

export function uploadBackgroundImage(file) {
  // TODO: call a promise here to upload image to endpoint
  return dispatch => {
    dispatch({
      type: A.UPLOAD_IMAGE
    })
  }
}

export default {
  uploadProfileImage,
  uploadBackgroundImage
}
