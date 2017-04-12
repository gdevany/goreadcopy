import http from '../../http'
import { Endpoints } from '../../../constants'

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
    getFollowers: (id, body) => http.get(getFollowers(id), body),
    getFetchFollowers: (id, params) => http.get(getFetchFollowers(id, params)),
    getFollowed: (id, body) => http.get(getFollowed(id), body),
    getFetchFollowed: (id, params) => http.get(getFetchFollowed(id, params)),
    deleteSocialAccount: (id) => authenticated().delete(deleteSocialAccount(id)),
    getSocialAccounts: (body) => authenticated().get(getSocialAccounts(), body),
    selectSocialAccount: (body) => authenticated().post(selectSocialAccount(), body),
    unSelectSocialAccount: (data) => authenticated().delete(unSelectSocialAccount(), { data }),
  }
}

export default Social()
