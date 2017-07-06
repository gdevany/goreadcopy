import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Home from './Home'
import { ReadFeed } from '../readFeed'
import { Auth } from '../../redux/actions'
import { Auth as CurrentToken } from '../../services'
import { General } from '../../services/api'

const { timesRendered } = General
const { verifyUserToken } = Auth
const isUserLogged = CurrentToken.currentUserExists()

class HomeWrapper extends PureComponent {
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
    return CurrentToken.currentUserExists() ?
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
