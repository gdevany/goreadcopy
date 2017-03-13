const Users = () => {
  const TYPES = {
    AUTHOR: 'AUTHOR',
    READER: 'READER',
  }

  const makeReader = (attrs) => {
    return {
      type: TYPES.READER,
      ...attrs
    }
  }

  const makeAuthor = (attrs) => {
    return {
      type: TYPES.AUTHOR,
      ...attrs
    }
  }

  const isAuthor = (user) => {
    return user.type === TYPES.AUTHOR
  }

  const isReader = (user) => {
    return user.type === TYPES.READER
  }

  return {
    TYPES,
    makeAuthor,
    makeReader,
    isAuthor,
    isReader,
  }
}

export default Users()
