import { CURRENT_READER as A } from '../const/actionTypes'
import { CONTEXTS as C } from '../../constants/litcoins'
import CurrentReaderSocial from '../../services/api/currentReader/social'
import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation'
import Users from '../../services/users'

const { TYPES: { READER, AUTHOR } } = Users

export function getFollowers(id, body) {
  return dispatch => {
    CurrentReaderSocial.getFollowers(id, body)
      .then((res) => dispatch({ type: A.GET_FOLLOWERS, payload: res.data }))
      .catch(err => console.error(`Error in getFollowers ${err}`))
  }
}

export function getFollowed(id, body) {
  return dispatch => {
    CurrentReaderSocial.getFollowed(id, body)
      .then((res) => dispatch({ type: A.GET_FOLLOWED, payload: res.data }))
      .catch(err => console.error(`Error in getFollowed ${err}`))
  }
}

export function updateFollowedAuthors({ authorIds, context }) {
  context = context || C.READ_FEED

  return dispatch => {
    return CurrentReaderRecommendation.likedAuthors({ authorIds, context })
      .then((res) => dispatch({ type: A.UPDATE_FOLLOWED_AUTHORS, payload: authorIds }))
      .catch(err => console.error(`Error in updateFollowedAuthors ${err}`))
  }
}

export function removeFollowedAuthors({ authorIds, context }) {
  context = context || C.READ_FEED

  return dispatch => {
    return CurrentReaderRecommendation.unlikedAuthors({ authorIds, context })
      .then((res) => dispatch({ type: A.REMOVE_FOLLOWED_AUTHORS, payload: authorIds }))
      .catch(err => console.error(`Error in removeFollowedAuthors ${err}`))
  }
}

export function updateFollowedReaders({ readerIds, context }) {
  context = context || C.READ_FEED

  return dispatch => {
    return CurrentReaderRecommendation.likedReaders({ readerIds, context })
      .then((res) => dispatch({ type: A.UPDATE_FOLLOWED_READERS, payload: readerIds }))
      .catch(err => console.error(`Error in updateFollowedReaders ${err}`))
  }
}

export function removeFollowedReaders({ readerIds, context }) {
  context = context || C.READ_FEED

  return dispatch => {
    return CurrentReaderRecommendation.unlikedReaders({ readerIds, context })
      .then((res) => dispatch({ type: A.REMOVE_FOLLOWED_READERS, payload: readerIds }))
      .catch(err => console.error(`Error in removeFollowedReaders ${err}`))
  }
}

export function updateFollowed(followed) {
  // update social
  // TODO: Test if readers isn't overwritten with real data when following new authors
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowed() to get an updated followed array of objects
    })
  }
}

export function updateFollowers(followers) {
  // TODO: update current_reader endpoint or wherever these are saved
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowers() to get an updated followed array of objects
    })
  }
}

const FOLLOW_READER = 'FOLLOW_READER'
const FOLLOW_AUTHOR = 'FOLLOW_AUTHOR'
const UNFOLLOW_READER = 'UNFOLLOW_READER'
const UNFOLLOW_AUTHOR = 'UNFOLLOW_AUTHOR'

const chooseFollowAction = (userType, follow) => {
  switch (userType) {
    case READER:
      return follow ? FOLLOW_READER : UNFOLLOW_READER
    case AUTHOR:
      return follow ? FOLLOW_AUTHOR : UNFOLLOW_AUTHOR
    default:
      console.error(`Unrecognized userType ${userType}`)
      return null
  }
}

const followOrUnfollowAction = ({ context, userType, follow, ids }) => {
  const action = chooseFollowAction(userType, follow)
  switch (action) {
    case FOLLOW_READER:
      return updateFollowedReaders({ readerIds: ids, context })
    case UNFOLLOW_READER:
      return removeFollowedReaders({ readerIds: ids, context })
    case FOLLOW_AUTHOR:
      return updateFollowedAuthors({ authorIds: ids, context })
    case UNFOLLOW_AUTHOR:
      return removeFollowedAuthors({ authorIds: ids, context })
    default:
      return null
  }
}

export function followOrUnfollow(args) {
  return (dispatch) => {
    return dispatch(followOrUnfollowAction(args))
  }
}

export default {
  followOrUnfollow,
  getFollowers,
  getFollowed,
  updateFollowed,
  updateFollowers,
  updateFollowedAuthors,
  removeFollowedAuthors,
  updateFollowedReaders,
  removeFollowedReaders,
}
