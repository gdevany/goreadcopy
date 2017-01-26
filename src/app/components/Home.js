import React from 'react'
import NavMenu from './NavMenu'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookCarousel from './BookLanding'

export const Home = () => {
  return (
    <div className='home'>
      <NavMenu />
      <CallToActionTop />
      <BookCarousel />
      <PriorityReasons />
      <CallToActionBottom />
    </div>
  )
}

export default Home
