import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import NavMenu from '../common/NavMenu'
import SettingsTabs from './SettingsTabs'
import { CurrentReader } from '../../redux/actions'
import { Auth } from '../../services'

const { getCurrentReader } = CurrentReader

class Settings extends PureComponent {

  componentWillMount = () => this.props.getCurrentReader()

  render() {
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div>
        <NavMenu isUserLoggedIn={isUserLoggedIn}/>
        <div className='settings-page'>
          <SettingsTabs/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}
export default connect(mapStateToProps, { getCurrentReader })(Settings)
