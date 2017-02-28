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
      <ReadFeed currentReader={this.props.currentReader}/>
    ) : (
      <Home />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currenReader: state.currentReader
  }
}

export default connect(mapStateToProps, { verifyUserToken })(HomeWrapper)
