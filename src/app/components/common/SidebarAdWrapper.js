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
    top: 64,
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
      scrollY: null,
    }
    this.getScrollPosition = this.getScrollPosition.bind(this)
  }

  componentWillMount = () => {
    this.props.getSidebarAds()
    if (this.context.router.params.slug) {
      this.setState({
        isProfileAd: true,
      })
    }
  }

  mapSidebarAds = () => {
    const { sidebarAds } = this.props
    if (sidebarAds.results) {
      return sidebarAds.results.map((ad, idx) => {
        return <SidebarAd key={idx} content={ad} isProfileAd={this.state.isProfileAd}/>
      })
    }
    return null
  }

  getScrollPosition() {
    const content = window.scrollY >= 1900 ? style.sidebarStyle : null
    console.log('Sidebar style:')
    console.log(content)
    this.setState({
      scrollY: content,
    })
  }

  render() {
    console.log('Scroll Render Position:')
    console.log(window.scrollY)
    return (
      <Scroller
        onScroll={this.getScrollPosition}
        debounced
        delay={250}
        enabled
        scrollParent={window}
      >
        <div className='sidebarAd' style={this.state.scrollY}>
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
