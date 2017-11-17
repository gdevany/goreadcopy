import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import Scroller from '../common/Scroller'
import { FavoriteGenres } from '../common'
import { CONTEXTS as C } from '../../constants/litcoins'
import MenuFooter from '../common/footer/MenuFooter'

const style = {
  leftContainerStyle: {
    position: 'fixed',
    top: 65,
  },
  profileBoxStyle: {
    width: 270,
    height: 309,
  },
}

class LeftContainer extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      leftContainerStyle: null,
      profileBoxStyle: null,
    }
  }

  getSidebarHeight = () => {
    const { handleMiddleContainer } = this.props
    const navbarOffset = document.getElementsByClassName('top-bar') ?
    document.getElementsByClassName('top-bar')[0].clientHeight : 0
    const leftSidebarHeight = document.getElementsByClassName('left-container-readfeed') ?
      document.getElementsByClassName('left-container-readfeed')[0].offsetHeight : 0
    const chatOffset = document.getElementsByClassName('main-conversation-container') ?
      document.getElementsByClassName('main-conversation-container')[0].clientHeight : 0
    const sidebarBottomHeight = navbarOffset + leftSidebarHeight + chatOffset
    const pageBottomHeight = window.scrollY + window.innerHeight
    const profileHeight = navbarOffset + style.profileBoxStyle.height - 50

    if (sidebarBottomHeight < pageBottomHeight && window.scrollY > profileHeight) {
      const adjustProfileHeight =
        leftSidebarHeight - style.profileBoxStyle.height < window.innerHeight ?
        style.profileBoxStyle.height - 150 : 0
      this.setState({
        leftContainerStyle: {
          position: 'fixed',
          top: window.innerHeight - leftSidebarHeight - chatOffset - adjustProfileHeight,
        },
        profileBoxStyle: style.profileBoxStyle,
      })
      handleMiddleContainer(true)
    } else {
      this.setState({
        leftContainerStyle: null,
        profileBoxStyle: null,
      })
      handleMiddleContainer(false)
    }
  }

  render() {
    const {
      id,
      genreIds,
      isMyReadFeed,
      fullname,
    } = this.props
    const { leftContainerStyle, profileBoxStyle } = this.state
    return (
      <Scroller
        onScroll={this.getSidebarHeight}
        debounced
        delay={0}
        enabled
        scrollParent={window}
      >
        <div className='left-container
          left-container-readfeed
          large-3
          hide-for-small-only
          hide-for-medium-only
          columns'
          style={leftContainerStyle}
        >
          { id ? <ReadFeedProfile id={id} profileBoxStyle={profileBoxStyle}/> : null }
          <LeftHandLinks />
          <FavoriteGenres
            genreIds={genreIds}
            isCurrentReader={isMyReadFeed}
            fullname={fullname}
            context={C.READ_FEED}
          />
          <MenuFooter />
        </div>
      </Scroller>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
    genreIds = [],
    fullname
  }
}) => {
  return {
    id,
    genreIds,
    fullname
  }
}

export default connect(mapStateToProps)(LeftContainer)
