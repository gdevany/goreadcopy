import React, { PureComponent } from 'react'
import TilesWrapper from './TilesWrapper'
import { ProfileDetailerTile } from './tiles'

class MiddleContainer extends PureComponent {
  render() {
    return (
      <div className='middle-container small-12 large-6 columns'>
        <ProfileDetailerTile />
        <TilesWrapper />
      </div>
    )
  }
}

export default MiddleContainer
