import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Home from './Home'
import { ReadFeed } from '../readFeed'
import { Auth } from '../../redux/actions'
import { Auth as CurrentToken } from '../../services'
import { General } from '../../services/api'

const { verifyUserToken } = Auth
const { timesRendered } = General

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
    timesRendered()
      .then(res => {
        if (res.data.timesRendered % 2 === 0) {
          browserHistory.push('/vid')
        }
      })
  }
  render() {
    return CurrentToken.currentUserExists() ? (
      <div>
        <Helmet>
          <title>{`GoRead | Home | Welcome back ${this.props.currentReader.fullname}`}</title>
          <meta
            name='description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@TheRealGoRead' />
          <meta name='twitter:title' content='GoRead | Home' />
          <meta
            name='twitter:description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta name='twitter:image' content='https://goread.com/image/281x281.png'/>
          <meta content='1528633757403356' property='fb:app_id' />
          <meta property='og:url' content='https://www.goread.com/' />
          <meta property='og:title' content='GoRead | Home' />
          <meta
            property='og:description'
            content='Earn Litcoins sharing your favorite books with others.'
          />
          <meta property='og:image' content='https://goread.com/image/281x281.png' />
          <meta property='og:image:width' content='281' />
          <meta property='og:image:height' content='281' />
          <meta property='og:image:type' content='image/png' />
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
