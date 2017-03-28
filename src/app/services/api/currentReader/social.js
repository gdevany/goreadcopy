import http from '../../http'
import { Endpoints } from '../../../constants'

const { authenticated } = http
const {
  selectSocialAccount,
  unSelectSocialAccount,
  getSocialAccounts,
  currentReader: {
    getFollowers,
    getFollowed,
    deleteSocialAccount,
  }
} = Endpoints

const Social = () => {
  return {
    getFollowers: (id, body) => http.get(getFollowers(id), body),
    getFollowed: (id, body) => http.get(getFollowed(id), body),
    deleteSocialAccount: (id) => authenticated().delete(deleteSocialAccount(id)),
    getSocialAccounts: (body) => authenticated().post(getSocialAccounts(), body),
    selectSocialAccount: (body) => authenticated().post(selectSocialAccount(), body),
    unSelectSocialAccount: (data) => authenticated().delete(unSelectSocialAccount(), { data }),
  }
}

export default Social()
