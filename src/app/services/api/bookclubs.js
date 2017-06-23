import http from '../http'
import { Endpoints } from '../../constants'

const { authenticated } = http

const { requestBookClubMembership } = Endpoints

const BookClubs = () => {
  return {
    membershipRequest: (body) => authenticated().post(requestBookClubMembership(), body),
  }
}

export default BookClubs()
