import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import NavMenu from '../common/NavMenu'
import Home from '../home/Home'
import SettingsTabs from './SettingsTabs'
import { CurrentReader } from '../../redux/actions'
import { Auth } from '../../services'
import { Auth as AuthAction } from '../../redux/actions'
import { Auth as CurrentToken } from '../../services'

const { getCurrentReader } = CurrentReader
const { verifyUserToken } = AuthAction

class Settings extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentWillMount = () => {

    const token = CurrentToken.token()
    if (token) {
      this.props.verifyUserToken({
        token,
      })
    }

    this.props.getCurrentReader()

  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.token) {
      this.props.getCurrentReader()
    }
  }

  render() {
    const isUserLoggedIn = Auth.currentUserExists()
    return CurrentToken.currentUserExists() ?
    (
      <div>
        <NavMenu isUserLoggedIn={isUserLoggedIn}/>
        <div className='settings-page'>
          <SettingsTabs/>
        </div>
      </div>
    ) : (
      <Home />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}
export default connect(mapStateToProps, { getCurrentReader, verifyUserToken })(Settings)
