import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { BaseNavView } from '../views'
import Home from '../home/Home'
import SettingsTabs from './SettingsTabs'
import { CurrentReader } from '../../redux/actions'
import { Auth } from '../../services'
import { Auth as AuthAction } from '../../redux/actions'

const { getCurrentReader } = CurrentReader
const { verifyUserToken } = AuthAction

class Settings extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      readerFetched: false
    }
  }

  componentWillMount = () => {
    const token = Auth.token()
    if (token) {
      this.props.verifyUserToken({
        token,
      })
    }
    this.props.getCurrentReader()
  }

  componentDidMount = () => window.scrollTo(0, 0)

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.token && !this.state.readerFetched) {
      this.props.getCurrentReader()
      this.setState({
        readerFetched: true
      })
    }
  }

  render() {
    return Auth.currentUserExists() ? (
      <BaseNavView>
        <Helmet>
          <title>GoRead | Settings</title>
        </Helmet>
        <div className='settings-page'>
          <SettingsTabs/>
        </div>
      </BaseNavView>
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
