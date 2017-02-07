import React from 'react'
import { NavMenu, Footer } from '../common'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'

const Home = () => {
  return (
    <div className='home'>
      <NavMenu />
      <CallToActionTop />
      <BookLanding />
      <PriorityReasons />
      <CallToActionBottom />
      <Footer />
    </div>
  )
}

export default Home
