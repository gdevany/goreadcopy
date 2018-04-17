import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Home from '../homev2/Home'
import { ReadFeed } from '../readFeed'
import { Auth as AuthActions } from '../../redux/actions'
import { Auth as AuthServices } from '../../services'
import { General } from '../../services/api'

const { timesRendered } = General
const { verifyUserToken } = AuthActions
const isUserLogged = AuthServices.currentUserExists()

class HomeWrapper extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount = () => {
    const token = AuthServices.token()
    if (token) {
      this.props.verifyUserToken({
        token,
      })
    }
    if (!isUserLogged) {
      timesRendered()
        .then(res => {
          if (res.data.timesRendered % 2 === 0) {
            browserHistory.push('/vid')
          }
        })
    }
  }

  render() {
    return AuthServices.currentUserExists() ?
      <ReadFeed isMyReadFeed={true}/> :
      <Home/>
  }
}

const mapStateToProps = ({ currentReader }) => {
  return {
    currentReader
  }
}

export default connect(mapStateToProps, { verifyUserToken })(HomeWrapper)
