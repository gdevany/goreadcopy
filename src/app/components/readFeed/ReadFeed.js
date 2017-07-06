import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import { BaseNavView } from '../views'
import { CurrentReader } from '../../redux/actions'
import { Helmet } from 'react-helmet'

const { getCurrentReader } = CurrentReader

class ReadFeed extends PureComponent {
  componentWillMount = () => this.props.getCurrentReader()

  componentDidMount = () => window.scrollTo(0, 0)

  render() {
    const { isMyReadFeed, currentReader: { id, fullname } } = this.props
    return (
      <BaseNavView>
        <Helmet>
          <title>{`GoRead | Home | Welcome back ${fullname}`}</title>
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
        <div className='row center-text read-feed'>
          <LeftContainer isMyReadFeed={isMyReadFeed}/>
          <MiddleContainer userId={id} />
          <RightContainer />
        </div>
      </BaseNavView>
    )
  }
}

const mapStateToProps = ({
  currentReader
}) => {
  return {
    currentReader
  }
}

export default connect(mapStateToProps, { getCurrentReader })(ReadFeed)
