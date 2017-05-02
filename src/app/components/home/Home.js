import React from 'react'
import { Helmet } from 'react-helmet'
import { NavMenu, Footer } from '../common'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import TestimonialCarousel from './TestimonialCarousel'

const Home = () => {
  return (
    <div className='home'>
      <Helmet>
        <title>GoRead</title>
        <meta
          name='description'
          content='Earn Litcoins sharing your favorite books with others.'
        />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@TheRealGoRead' />
        <meta name='twitter:title' content='GoRead' />
        <meta
          name='twitter:description'
          content='Earn Litcoins sharing your favorite books with others.'
        />
        <meta name='twitter:image' content='https://goread.com/image/281x281.png'/>

        <meta property='og:title' content='GoRead' />
        <meta
          property='og:description'
          content='Earn Litcoins sharing your favorite books with others.'
        />
        <meta property='og:image' content='https://goread.com/image/281x281.png' />
        <meta property='og:image:width' content='281' />
        <meta property='og:image:height' content='281' />
        <meta property='og:image:type' content='image/png' />

      </Helmet>
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
