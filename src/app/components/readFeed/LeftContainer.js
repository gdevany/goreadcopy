import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import { FavoriteGenres } from '../common'
import { CONTEXTS as C } from '../../constants/litcoins'

class LeftContainer extends PureComponent {
  render() {
    const {
      id,
      genreIds,
      isMyReadFeed,
      fullname
    } = this.props
    return (
      <div className='left-container large-3 hide-for-small-only hide-for-medium-only columns'>
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
