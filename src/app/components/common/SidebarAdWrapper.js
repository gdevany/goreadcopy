import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SidebarAd from './SidebarAd'
import Scroller from './Scroller'
import { Ads } from '../../redux/actions'

const { getSidebarAds } = Ads
const style = {
  readfeedStyle: {
    position: 'fixed',
    background: 'white',
    width: 270,
    top: 78,
  },
  profileStyle: {
    position: 'fixed',
    background: 'white',
    width: 184,
    top: 78,
  }
}

class SidebarAdWrapper extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 99999,
      scrollY: null,
    }
    this.getScrollPosition = this.getScrollPosition.bind(this)
  }

  componentWillMount = () => {
    this.props.getSidebarAds()
  }

  mapSidebarAds = () => {
    const { sidebarAds } = this.props
    const { scrollY } = this.state
    if (sidebarAds.results) {
      return sidebarAds.results.map((ad, idx) => {
        return (
        <SidebarAd
          key={idx}
          content={ad}
          adClass={idx > 0 ? scrollY : null}
        />
        )
      })
    }
    return null
  }

  getScrollPosition() {
    const { view } = this.props
    const scrollComp = window.scrollY || document.documentElement.scrollTop
    const topBar = document.getElementsByClassName('top-bar')[0]
    const bookRecommendations = document.getElementById('book-recommendations')
    const authorRecommendations = document.getElementById('author-recommendations')
    const bookclubRecommendations = document.getElementById('bookclub-recommendations')
    const sidebarAd = document.getElementsByClassName('sidebarAd')[0]
    const backgroundImageWrapper = document.getElementsByClassName('background-image-wrapper')[0]
    let scrollStyle, sidebarOffset, navbarOffset, bookRecomOffset, authorRecomOffset,
      bookclubRecomOffset, firstadOffset, overlayOffset
    switch (view) {
      case 'readfeed':
        navbarOffset = topBar ? topBar.clientHeight : 0
        bookRecomOffset = bookRecommendations ? bookRecommendations.clientHeight : 0
        authorRecomOffset = authorRecommendations ? authorRecommendations.clientHeight : 0
        bookclubRecomOffset = bookclubRecommendations ? bookclubRecommendations.clientHeight : 0
        firstadOffset = sidebarAd.firstChild ? sidebarAd.firstChild.clientHeight : 0
        scrollStyle = style.readfeedStyle
        sidebarOffset = navbarOffset +
                        bookRecomOffset +
                        authorRecomOffset +
                        bookclubRecomOffset +
                        firstadOffset
        break
      case 'profile':
        const firstadStyle =
          getComputedStyle(sidebarAd.firstChild)
        overlayOffset = backgroundImageWrapper ? backgroundImageWrapper.clientHeight : 0
        firstadOffset = sidebarAd ? sidebarAd.firstChild.clientHeight : 0 +
          parseInt(firstadStyle.marginBottom, 10)
        scrollStyle = style.profileStyle
        sidebarOffset = overlayOffset + firstadOffset
        break
    }
    const content = scrollComp >= this.state.scrollHeight ? scrollStyle : null
    if (content === null) {
      this.setState({
        scrollHeight: sidebarOffset,
        scrollY: content,
      })
    } else {
      this.setState({ scrollY: content })
    }
  }

  render() {
    return (
      <Scroller
        onScroll={this.getScrollPosition}
        debounced
        delay={0}
        enabled
        scrollParent={window}
      >
        <div className='sidebarAd'>
          {this.mapSidebarAds()}
        </div>
      </Scroller>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarAds: state.sidebarAds,
  }
}

export default connect(mapStateToProps, { getSidebarAds })(SidebarAdWrapper)
