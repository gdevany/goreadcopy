import Http from '../http'
import { Endpoints } from '../../constants'

const { jwtRefresh, jwtAuth, jwtVerify } = Endpoints

const Jwt = (http) => {
  return {
    refreshJwt: (body) => http.post(jwtRefresh(), body),
    authJwt: (body) => http.post(jwtAuth(), body),
    verifyJwt: (body) => http.post(jwtVerify(), body),
  }
}

export default Jwt(Http)
