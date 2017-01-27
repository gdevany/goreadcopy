import React from 'react'
import NavMenu from './NavMenu'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'

export const Home = () => {
  return (
    <div className='home'>
      <NavMenu />
      <CallToActionTop />
      <CallToActionBottom />
    </div>
  )
}

export default Home
