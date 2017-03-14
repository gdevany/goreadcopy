import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import { FavoriteGenres } from '../common'

class LeftContainer extends PureComponent {
  render() {
    const {
      id,
      genreIds,
      isMyReadFeed,
      username
    } = this.props
    return (
      <div className='left-container large-3 hide-for-small-only hide-for-medium-only columns'>
        { id ? <ReadFeedProfile id={id}/> : null }
        <LeftHandLinks />
        <FavoriteGenres
          genreIds={genreIds}
          isCurrentReader={isMyReadFeed}
          username={username}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
    genreIds = [],
    username
  }
}) => {
  return {
    id,
    genreIds,
    username
  }
}

export default connect(mapStateToProps)(LeftContainer)
