import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BaseNavView } from '../views'
import { Footer } from '../common'
import MenuFooter from '../common/footer/MenuFooter'
import LeftHandLinks from '../readFeed/LeftHandLinks'
import BookRecommendations from '../readFeed/BookRecommendations'
import { CurrentReader } from '../../redux/actions'
import { Antispam, Privacy, Terms } from './'

const { getCurrentReader } = CurrentReader

class PublicWrapper extends Component {

  componentWillMount = () => this.props.getCurrentReader()

  componentDidMount = () => window.scrollTo(0, 0)

  render() {
    const { context } = this.props.route
    return (
      <BaseNavView>
        <div className='row center-text public-container'>
          <div className='small-3 columns'>
            <LeftHandLinks />
            <MenuFooter />
          </div>
          <div className='small-6 columns public-main-row'>
            {context === 'antispam' ?
              <Antispam /> : null
            }
            {context === 'privacy' ?
              <Privacy /> : null
            }
            {context === 'terms' ?
              <Terms /> : null
            }
          </div>
          <div className='small-3 columns'>
            <BookRecommendations />
          </div>
        </div>
        <Footer />
      </BaseNavView>
    )
  }
}
export default connect(null, { getCurrentReader })(PublicWrapper)
