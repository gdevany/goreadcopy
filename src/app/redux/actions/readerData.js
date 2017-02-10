import { browserHistory } from 'react-router'
import { READERS as A, CURRENT_READER } from '../const/actionTypes'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import { Readers } from '../../services/api'
import { Auth, Errors, Promise } from '../../services'
import { SignupModalValidator } from '../../services/validators'
import { updateLitcoinBalance } from './litcoins'

const { hasErrors } = Errors
const { validate } = SignupModalValidator

export function createReader() {
  return (dispatch, getState) => {
    const { readerData } = getState()
    const payload = readerData

    dispatch({
      type: A.CREATE_READER,
      payload,
    })

    return Readers.createReader(payload)
      .then((res) => dispatch(createReaderSuccess(res)))
      .then(() => dispatch(updateLitcoinBalance(L.CREATED_ACCOUNT)))
      .catch((err) => dispatch(updateReaderErrors(err)))
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
        .then(() => dispatch(updateLitcoinBalance(L.COMPLETE_SIGNUP_MODAL)))
        .then(() => browserHistory.push('/signup'))

    return result
  }
}

export function updateReaderErrors(error) {
  const errors = Errors.errorsFrom(error)
  return {
    type: A.UPDATE_READER_ERRORS,
    errors,
  }
}

export function checkFields(fields) {
  return (dispatch) => {
    const results = validate(fields)

    if (hasErrors(results)) { return dispatch(updateReaderErrors(results)) }

    return dispatch(checkEmail(fields))
  }
}

export function checkEmail(fields) {
  return (dispatch) => {
    return Readers.checkValidation({ email: fields.email })
      .then(() => dispatch(getInitialReaderData(fields)))
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
  checkFields,
  createReader,
  createReaderSuccess,
  getInitialReaderData,
  updateReaderData,
  updateReaderErrors,
}
