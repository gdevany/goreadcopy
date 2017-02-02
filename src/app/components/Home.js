import React from 'react'
import NavMenu from './NavMenu'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import Footer from './Footer'
import SignUpStepper from './SignUpStepper'

const Home = () => {
  return (
    <div className='home'>
      <SignUpStepper />
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
