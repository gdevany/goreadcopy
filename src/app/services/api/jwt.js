import Http from '../http'
import { Endpoints } from '../../constants'

const { jwtRefresh, jwtAuth } = Endpoints

const Jwt = (http) => {
  return {
    refreshJwt: (body) => http.post(jwtRefresh(), body),
    authJwt: (body) => http.post(jwtAuth(), body),
  }
}

export default Jwt(Http)
