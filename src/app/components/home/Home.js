import React from 'react'
import { Helmet } from 'react-helmet'
import { Footer } from '../common'
import { BaseNavView } from '../views'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import TestimonialCarousel from './TestimonialCarousel'
import ReactPlayer from 'react-player'
import UserProof from '../common/navs/tools/UserProof'

const Home = () => {
  return (
    <BaseNavView>
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
          <meta content='1528633757403356' property='fb:app_id' />
          <meta property='og:url' content='https://www.goread.com/' />
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
        <CallToActionTop />
        <BookLanding />
        {location.pathname === '/vid' ?
          (
            <ReactPlayer
              className='video-player-landing'
              playing={true}
              controls={false}
              url='https://player.vimeo.com/video/222335035'
            />
          ) : null
        }
        <PriorityReasons />
        <TestimonialCarousel />
        <CallToActionBottom />
        <Footer />
        <UserProof />
      </div>
    </BaseNavView>
  )
}

export default Home
