import R from 'ramda'

const Steps = () => {
  const STEPS = {
    USER_INFO: 0,
    SELECT_GENRES: 1,
    SELECT_USERS: 2,
  }

  const NAMES = {
    'userInfo': 'USER_INFO',
    'selectGenres': 'SELECT_GENRES',
    'selectUsers': 'SELECT_USERS',
  }

  const first = R.always(R.nth(0, R.values(STEPS)))
  const last = R.always(R.last(R.values(STEPS)))

  const finished = (currentStep) => {
    return currentStep >= last()
  }

  const previous = (currentStep) => {
    return R.max(first(), currentStep - 1)
  }

  const next = (currentStep) => {
    return R.min(last(), currentStep + 1)
  }

  const fromName = (name) => {
    return STEPS[NAMES[name]]
  }

  return {
    STEPS,
    finished,
    first,
    fromName,
    last,
    next,
    previous,
  }
}

export default Steps()
