import { CURRENT_READER as A } from '../const/actionTypes'
import CurrentReaderImages from '../../services/api/currentReader/images'

export function uploadImage(file) {
  return dispatch => {
    CurrentReaderImages.uploadImage(file)
      .then(() => dispatch({ type: A.UPLOAD_IMAGE }))
      .catch((err) => console.log(`Error in uploadImage api call: ${err}`))
  }
}

export default {
  uploadImage,
}
