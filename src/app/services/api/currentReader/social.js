import http from '../../http'
import { Endpoints } from '../../../constants'
import { Auth } from '../../'

const isUserLoggedIn = Auth.currentUserExists()
const { authenticated } = http
const {
  selectSocialAccount,
  unSelectSocialAccount,
  getSocialAccounts,
  currentReader: {
    getFollowers,
    getFetchFollowers,
    getFollowed,
    getFetchFollowed,
    deleteSocialAccount,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => {
      if (isUserLoggedIn) {
        return authenticated().get(getFollowers(id), body)
      }
      return http.get(getFollowers(id), body)
    },
    getFetchFollowers: (id, params) => {
      if (isUserLoggedIn) {
        return authenticated().get(getFetchFollowers(id, params))
      }
      return http.get(getFetchFollowers(id, params))
    },
    getFollowed: (id, body) => {
      if (isUserLoggedIn) {
        return authenticated().get(getFollowed(id), body)
      }
      return http.get(getFollowed(id, body))
    },
    getFetchFollowed: (id, params) => {
      if (isUserLoggedIn) {
        return authenticated().get(getFetchFollowed(id, params))
      }
      return http.get(getFetchFollowed(id, params))
    },
    deleteSocialAccount: (id) => authenticated().delete(deleteSocialAccount(id)),
    getSocialAccounts: (body) => authenticated().get(getSocialAccounts(), body),
    selectSocialAccount: (body) => authenticated().post(selectSocialAccount(), body),
    unSelectSocialAccount: (data) => authenticated().delete(unSelectSocialAccount(), { data }),
  }
}

export default Social()
