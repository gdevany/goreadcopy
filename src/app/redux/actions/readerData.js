import R from 'ramda'
import { browserHistory } from 'react-router'
import { READERS as A, CURRENT_READER } from '../const/actionTypes'
import { LITCOIN_TYPES as L } from '../../constants/litcoins'
import { Readers } from '../../services/api'
import { Auth, Errors, Promise } from '../../services'
import { updateLitcoinBalance } from './litcoins'

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
    const errorFields = {}

    // TODO: handle frontend validations more generically
    if (R.isEmpty(fields.firstName) || R.isEmpty(fields.lastName)) {
      if (R.isEmpty(fields.firstName)) {
        errorFields['firstName'] = Errors.message('First name is required')
      }

      if (R.isEmpty(fields.lastName)) {
        errorFields['lastName'] = Errors.message('Last name is required')
      }

      const errors = Errors.errors(errorFields)

      return dispatch(updateReaderErrors(errors))
    }

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
