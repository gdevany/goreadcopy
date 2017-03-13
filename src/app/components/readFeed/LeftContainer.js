import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import { FavoriteGenres } from '../common'

class LeftContainer extends PureComponent {
  render() {
    const { id } = this.props
    return (
      <div className='left-container large-3 hide-for-small-only hide-for-medium-only columns'>
        { id ? <ReadFeedProfile id={id}/> : null }
        <LeftHandLinks />
        <FavoriteGenres />
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id
  }
}) => {
  return {
    id
  }
}

export default connect(mapStateToProps)(LeftContainer)
