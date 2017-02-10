import R from 'ramda'

const Errors = () => {
  const noErrors = (errors = {}) => {
    return R.isEmpty(errors)
  }

  const hasErrors = R.complement(noErrors)

  const errors = (errors = {}) => {
    if (noErrors(errors)) { return none() }

    return {
      response: {
        data: {
          errors,
        },
      },
    }
  }

  const message = (message) => {
    return {
      message: [message],
    }
  }

  const fieldMessage = (field, messageText) => {
    return {
      [field]: message(messageText)
    }
  }

  const none = R.always({})

  const errorsFrom = R.compose(R.propOr({}, 'errors'), R.prop('data'), R.prop('response'))

  const messageFrom = R.compose(R.join(' '), R.propOr('', 'message'))

  return {
    errors,
    errorsFrom,
    fieldMessage,
    hasErrors,
    noErrors,
    message,
    messageFrom,
    none,
  }
}

export default Errors()
