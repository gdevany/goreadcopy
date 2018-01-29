import * as ErrorMessages from './ErrorMessages.js'

const hasEmailFormat = /\S+@\S+\.\S+/

export const required = (text) => {
  if (text) { return null }
  return ErrorMessages.isRequired
}

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName)
  }
}

export const minLength = (length) => {
  return (text) => {
    return text.length >= length ? null : ErrorMessages.minLength(length)
  }
}

export const isEmail = (text) => {
  if (hasEmailFormat.test(text)) { return null }
  return ErrorMessages.isEmail
}

export default {
  required,
  mustMatch,
  minLength,
  isEmail,
}
