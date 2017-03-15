const Users = () => {
  const API_TYPES = {
    USER_PROFILE: 'userprofile',
    AUTHOR: 'author',
  }

  const AUTHOR = 'AUTHOR'
  const READER = 'READER'

  const TYPES = {
    AUTHOR,
    READER,
  }

  const from = (attrs) => {
    const contentType = attrs.contentType

    switch (contentType) {
      case API_TYPES.USER_PROFILE: return makeReader(attrs)
      case API_TYPES.AUTHOR: return makeAuthor(attrs)
      default:
        console.error(`Couldn't parse user type: ${attrs}`)
        return null
    }
  }

  const makeReader = (attrs) => {
    return {
      type: READER,
      ...attrs
    }
  }

  const makeAuthor = (attrs) => {
    return {
      type: AUTHOR,
      ...attrs
    }
  }

  const fullName = (user) => {
    switch (user.type) {
      case READER: return `${user.firstName} ${user.lastName}`
      case AUTHOR: return user.fullname
      default: return ''
    }
  }

  const imageUrl = (user) => {
    return user.imageUrl
  }

  const description = (user) => {
    return user.shortBio || ''
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
    from,
    fullName,
    imageUrl,
    description,
  }
}

export default Users()
