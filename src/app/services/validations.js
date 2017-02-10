import R from 'ramda'
import S from 'underscore.string.fp'
import Errors from './errors'
import HigherOrder from './higherOrder'

const { errors, fieldMessage, none } = Errors
const { applyVal } = HigherOrder

// NOTE: For frontend validations only.
// Functions here produce errors in a common format w/ errors returned
// from the server so we can display them in the same way
const Validations = () => {
  const defaultMessage = R.curry((field, restOfMsg) => {
    return `${S.humanize(field)} ${restOfMsg}`
  })

  const presenceOf = R.curry(({ field, message }, fields) => {
    const fieldVal = fields[field]
    message = message || defaultMessage(field, 'is required')

    const result =
      R.isNil(fieldVal) || R.isEmpty(fieldVal) ?
      fieldMessage(field, message) :
      none()

    return result
  })

  const validateAll = R.curry((validations, fields) => {
    const messages = R.mergeAll(applyVal(fields)(validations))
    return errors(messages)
  })

  return {
    presenceOf,
    validateAll,
  }
}

export default Validations()
