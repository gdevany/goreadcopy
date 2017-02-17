import React, { PureComponent } from 'react'
import { NavMenu, Footer } from '../common'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import TestimonialCarousel from './TestimonialCarousel'

class Home extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLogged: true
    }

  }
  render() {
    if (this.state.isLogged) {
      return (
        <NavMenu />
      )
    }
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
}

export default Home
