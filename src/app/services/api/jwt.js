import Http from '../http'
import { Endpoints } from '../../constants'

const { jwtRefresh } = Endpoints

const Jwt = (http) => {
  return {
    refreshJwt: (body) => http.post(jwtRefresh(), body),
  }
}

export default Jwt(Http)
