import P from 'bluebird'

const Promise = () => {
  return {
    ...P,
    Promise: P,
  }
}

export default Promise()
