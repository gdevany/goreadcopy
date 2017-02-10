import R from 'ramda'

const Errors = () => {
  const errors = (errors = {}) => {
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

  const errorsFrom = R.compose(R.propOr({}, 'errors'), R.prop('data'), R.prop('response'))

  const messageFrom = R.compose(R.join(' '), R.propOr('', 'message'))

  return {
    errors,
    errorsFrom,
    message,
    messageFrom,
  }
}

export default Errors()
