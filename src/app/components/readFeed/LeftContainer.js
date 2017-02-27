import React, { PureComponent } from 'react'
import ReadFeedProfile from './ReadFeedProfile'
import LeftHandLinks from './LeftHandLinks'
import FavoriteGenres from './FavoriteGenres'

class LeftContainer extends PureComponent {
  render() {
    const { isUserLoggedIn } = this.props
    return (
      <div className='left-container small-12 large-3 columns'>
        {/** pass down backgroundImage and profileImage prop to ReadFeedProfile **/}
        <ReadFeedProfile isUserLoggedIn={isUserLoggedIn} />
        <LeftHandLinks />
        <FavoriteGenres />
      </div>
    )
  }
}

export default LeftContainer
