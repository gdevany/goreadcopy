import { Auth as AuthServices } from '../../../services'

function AuthView(props) {
  const isUserLoggedIn = AuthServices.currentUserExists()
  return isUserLoggedIn ?
    props.children :
    null
}

export default AuthView
