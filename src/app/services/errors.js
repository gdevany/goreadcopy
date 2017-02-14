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

  const expectedErrors = R.compose(R.prop('errors'), R.propOr({}, 'data'), R.propOr({}, 'response'))

  const unexpectedErrors = (error) => {
    const hasAnError = R.prop('message', error)
    const catchallMessage = 'Sorry! There was a problem on our end. Please try again later'
    if (hasAnError) {
      return { nonFieldErrors: message(catchallMessage) }
    }
    return null
  }

  const errorsFrom = (error) => {
    // for expected error messages from the API
    const expected = expectedErrors(error)

    // for unexpected error messages, i.e. network, syntax, etc
    const unexpected = unexpectedErrors(error)

    return expected || unexpected || {}
  }

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
