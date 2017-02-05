import { browserHistory } from 'react-router'
import { READERS as A, CURRENT_READER } from '../const/actionTypes'
import { Readers } from '../../services/api'
import { Auth, Promise } from '../../services'

export function createReader() {
  return (dispatch, getState) => {
    const { readerData } = getState()
    const payload = readerData

    dispatch({
      type: A.CREATE_READER,
      payload,
    })

    // TODO: dispatch failure action
    return Readers.createReader(payload)
      .then((res) => dispatch(createReaderSuccess(res)))
  }
}

export function createReaderSuccess({ data }) {
  return (dispatch) => {
    const payload = data

    // TODO: refactor to use currentReader.setCurrentReader
    Auth.setToken(payload.token)

    dispatch({
      type: CURRENT_READER.SET_CURRENT_READER,
      payload,
    })
    // TODO: end

    dispatch({
      type: A.CREATE_READER_SUCCESS,
      payload,
    })
  }
}

export function getInitialReaderData(data) {
  return (dispatch) => {
    const result =
      Promise.of(dispatch(updateReaderData(data)))
        .then(() => browserHistory.push('/signup'))

    return result
  }
}

export function updateReaderErrors(error) {
  const { errors } = error
  return {
    type: A.UPDATE_READER_ERRORS,
    errors,
  }
}

export function checkEmail(field, data) {
  return (dispatch) => {
    return Readers.checkValidation(field)
      .then(() => dispatch(getInitialReaderData(data)))
      .catch(err => dispatch(updateReaderErrors(err)))
  }
}

export function updateReaderData(payload) {
  return {
    type: A.UPDATE_READER_DATA,
    payload,
  }
}

export default {
  checkEmail,
  createReader,
  createReaderSuccess,
  getInitialReaderData,
  updateReaderData,
  updateReaderErrors,
}
