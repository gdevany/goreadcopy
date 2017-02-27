import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Home from './Home'
import { ReadFeed } from '../readFeed'
import { Auth } from '../../redux/actions'
import { Auth as CurrentToken } from '../../services'

const { verifyUserToken } = Auth

class HomeWrapper extends PureComponent {
  componentDidMount = () => {
    const token = CurrentToken.token()
    if (token) {
      this.props.verifyUserToken({
        token,
      })
    }
  }
  render() {
    return this.props.isLogged ? (<ReadFeed />) : (<Home />)
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.currentReader.token
  }
}

export default connect(mapStateToProps, { verifyUserToken })(HomeWrapper)
