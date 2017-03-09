import React, { PureComponent } from 'react'
import TilesWrapper from './TilesWrapper'
import { AnnouncementTile } from './tiles'

class MiddleContainer extends PureComponent {
  render() {
    return (
      <div className='middle-container small-12 large-6 columns'>
        <AnnouncementTile/>
        <TilesWrapper />
      </div>
    )
  }
}

export default MiddleContainer
