import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import { FavoriteGenres } from '../common'
import { CONTEXTS as C } from '../../constants/litcoins'

class LeftContainer extends PureComponent {

  constructor(props) {
    super(props)
  }

  getSidebarHeight = () => {
    navbarOffset = document.getElementsByClassName('top-bar')[0].clientHeight
    leftSidebarHeight = document.getElementsByClassName('left-container-readfeed')[0].offsetHeight
    sidebarBottomHeight = navbarOffset + leftSidebarHeight
    pageBottomHeight = window.scrollY + window.innerHeight
    if (sidebarBottomHeight < pageBottomHeight) {

    }
  }

  render() {
    const {
      id,
      genreIds,
      isMyReadFeed,
      fullname
    } = this.props

    this.getSidebarHeight()

    return (
      <div className='left-container
        left-container-readfeed
        large-3
        hide-for-small-only
        hide-for-medium-only
        columns'
      >
        { id ? <ReadFeedProfile id={id}/> : null }
        <LeftHandLinks />
        <FavoriteGenres
          genreIds={genreIds}
          isCurrentReader={isMyReadFeed}
          fullname={fullname}
          context={C.READ_FEED}
        />
      </div>
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
