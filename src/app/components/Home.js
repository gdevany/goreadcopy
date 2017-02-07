import React from 'react'
import { StyleRoot } from 'radium'
import NavMenu from './NavMenu'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import Footer from './Footer'
import Stepper from './SignUpStepper'

const Home = () => {
  return (
    <StyleRoot>
      <div className='home'>
        <Stepper />
        <NavMenu />
        <CallToActionTop />
        <BookLanding />
        <PriorityReasons />
        <CallToActionBottom />
        <Footer />
      </div>
    </StyleRoot>
  )
}

export default Home
