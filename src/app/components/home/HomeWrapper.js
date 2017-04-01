import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
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
      <div>
        <Helmet>
          <title>{`GoRead | Home | Welcome back ${this.props.currentReader.fullname}`}</title>
        </Helmet>
        <ReadFeed isMyReadFeed={true}/>
      </div>
    ) : (
      <Home />
    )
  }
}

const mapStateToProps = ({ currentReader }) => {
  return {
    currentReader
  }
}

export default connect(mapStateToProps, { verifyUserToken })(HomeWrapper)
