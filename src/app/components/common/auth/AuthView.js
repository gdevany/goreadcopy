import { Auth as AuthServices } from '../../../services'
import PropTypes from 'prop-types'

function AuthView(props) {
  const isUserLoggedIn = AuthServices.currentUserExists()
  const { forLoggedOut } = props
  return isUserLoggedIn ?
    forLoggedOut ?
      null :
      props.children :
    forLoggedOut ?
      props.children :
      null
}

AuthView.propTypes = {
  forLoggedOut: PropTypes.bool,
}

AuthView.defaultProps = {
  forLoggedOut: false,
}

export default AuthView
