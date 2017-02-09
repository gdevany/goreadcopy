import React from 'react'
import { NavMenu, Footer } from '../common'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import TestimonialCarousel from './TestimonialCarousel'

const Home = () => {
  return (
    <div className='home'>
      <NavMenu />
      <CallToActionTop />
      <BookLanding />
      <PriorityReasons />
      <TestimonialCarousel />
      <CallToActionBottom />
      <Footer />
    </div>
  )
}

export default Home
