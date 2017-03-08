import React, { PureComponent } from 'react'
import TilesWrapper from './TilesWrapper'

class MiddleContainer extends PureComponent {
  render() {
    return (
      <div className='middle-container small-12 large-6 columns'>
        <TilesWrapper />
      </div>
    )
  }
}

export default MiddleContainer
