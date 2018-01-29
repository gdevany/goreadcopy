import R from 'ramda'
import { Readers } from '../services/api'

const { checkValidation } = Readers

export const stageLoginSubmit = R.curry((step, that, next) => {
  if (that.isAlreadyDone(next, step)) { return null }
  return that.block(() => {
    return that.props.processUserLogin(that.payload('LOGIN'))
      .then(res => {
        that.unblock()
        that.incrementPipelineStep()
        next(null)
      })
      .catch(err => {
        that.unblock()
        next(err)
      })
  })
})

export const stageSignUpSubmit = R.curry((step, that, next) => {
  if (that.isAlreadyDone(next, step)) { return null }
  return that.block(() => {
    return that.props.signUpReader(that.payload('SIGN_UP'))
      .then(res => {
        that.unblock()
        that.incrementPipelineStep()
        next(null)
      })
      .catch(err => {
        that.setErrorResponse(err)
        that.unblock()
        next(err)
      })
  })
})

export const stageGetUsername = R.curry((step, counter, that, next) => {
  if (that.isAlreadyDone(next, step)) { return null }
  const username = that.constructUsername(counter)
  return that.block(() => {
    return checkValidation({ username })
      .then(res => {
        that.unblock()
        that.incrementPipelineStep()
        that.setState({ username })
        next(null)
      })
      .catch(err => {
        that.unblock()
        if (!counter) stageGetUsername(step, 1, that, next)
        else if (counter && counter < 10) stageGetUsername(step, counter + 1, that, next)
        else next(err)
      })
  })
})

export const stageUserProfileUpdate = R.curry((step, that, next) => {
  if (that.isAlreadyDone(next, step)) { return null }
  return that.block(() => {
    return that.props.updateReader(that.payload('UPDATE_READER'))
      .then(res => {
        that.unblock()
        that.incrementPipelineStep()
        next(null)
      })
      .catch(err => {
        that.setErrorResponse(err)
        that.unblock()
        next(err)
      })
  })
})

export default {
  stageLoginSubmit,
  stageSignUpSubmit,
  stageGetUsername,
  stageUserProfileUpdate,
}
