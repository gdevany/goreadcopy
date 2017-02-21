import React from 'react'
import NavMenu from '../common/NavMenu'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
import { Auth } from '../../services'
const ReadFeed = () => {
  const isUserLoggedIn = Auth.currentUserExists()
  return (
    <div className='home'>
      <NavMenu isUserLoggedIn={isUserLoggedIn} />
      <div className='row'>
        <LeftContainer />
        <MiddleContainer />
        <RightContainer />
      </div>
    </div>
  )
}

export default ReadFeed
