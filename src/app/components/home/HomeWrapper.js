import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Home from './Home'
import { ReadFeed } from '../readFeed'
import { Auth } from '../../redux/actions'
import { Auth as CurrentToken } from '../../services'

const { verifyUserToken } = Auth

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
  }
  render() {
    return CurrentToken.currentUserExists() ? (
      <ReadFeed isMyReadFeed={true}/>
    ) : (
      <Home />
    )
  }
}

export default connect(null, { verifyUserToken })(HomeWrapper)
