import React, { PureComponent } from 'react'
import TilesWrapper from './TilesWrapper'
import { ProfileDetailerTile, AnnouncementTile } from './tiles'

class MiddleContainer extends PureComponent {
  render() {
    return (
      <div className='middle-container small-12 large-6 columns'>
        <ProfileDetailerTile />
        <AnnouncementTile/>
        <TilesWrapper />
      </div>
    )
  }
}

export default MiddleContainer
