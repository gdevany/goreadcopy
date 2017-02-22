import React from 'react'
import NavMenuLogged from '../common/NavMenuLogged'
import LeftContainer from './LeftContainer'
import MiddleContainer from './MiddleContainer'
import RightContainer from './RightContainer'
// import { Auth } from '../../services'

const ReadFeed = () => {
  const isUserLoggedIn = true
  return (
    <div className='home'>
      <NavMenuLogged isUserLoggedIn={isUserLoggedIn} />
      <div className='row'>
        <LeftContainer />
        <MiddleContainer />
        <RightContainer />
      </div>
    </div>
  )
}

export default ReadFeed
