import React from 'react'
import NavMenu from '../common/NavMenu'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'

const ReadFeed = () => {
  return (
    <div className='home'>
      <NavMenu />
      <div className='row'>
        <LeftContainer />
        <MiddleContainer />
        <RightContainer />
      </div>
    </div>
  )
}

export default ReadFeed
