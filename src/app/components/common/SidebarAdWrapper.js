import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import SidebarAd from './SidebarAd'
import Scroller from './Scroller'
import { Ads } from '../../redux/actions'

const { getSidebarAds } = Ads
const style = {
  sidebarStyle: {
    position: 'fixed',
    background: 'white',
    width: 270,
    top: 68,
  }
}

class SidebarAdWrapper extends PureComponent {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      isProfileAd: false,
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
    const content = scrollComp >= this.state.scrollHeight ? style.sidebarStyle : null
    const navbarOffset = document.getElementsByClassName('top-bar')[0].clientHeight
    const bookRecomOffset = document.getElementById('book-recommendations').clientHeight
    const authorRecomOffset = document.getElementById('author-recommendations').clientHeight
    const bookclubRecomOffset = document.getElementById('bookclub-recommendations').clientHeight
    const firstadOffset = document.getElementsByClassName('sidebarAd')[0].firstChild.clientHeight
    const overlayOffset = document.getElementsByClassName('overlay')[0].clientHeight
    let sidebarOffset
    switch (view) {
      case 'readfeed':
        sidebarOffset = navbarOffset +
                        bookRecomOffset +
                        authorRecomOffset +
                        bookclubRecomOffset +
                        firstadOffset
        break
      case 'profile':
        sidebarOffset = navbarOffset +
                        overlayOffset +
                        firstadOffset
        break
    }
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
