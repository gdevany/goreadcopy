import React from 'react'
import { Helmet } from 'react-helmet'
import { NavMenu, Footer } from '../common'
import CallToActionTop from './CallToActionTop'
import CallToActionBottom from './CallToActionBottom'
import PriorityReasons from './PriorityReasons'
import BookLanding from './BookLanding'
import TestimonialCarousel from './TestimonialCarousel'
import ReactPlayer from 'react-player'

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
        <script id='proof-script'>
          {`
            !function(){function b(){var a=(new Date).getTime(),
            b=document.createElement('script');
            b.type='text/javascript',b.async=!0,
            b.src='https://cdn.getmoreproof.com/embed/latest/proof.js?'+a;
            var c=document.getElementsByTagName('script')[0];c.parentNode.insertBefore(b,c)}
            var a=window;a.attachEvent?a.attachEvent('onload',b):a.addEventListener('load',b,!1),
            window.proof_config={acc:'GjbSn61NgrXSpzXkmaKLmwra6eC2', v:'1.1'}}()
          `}
        </script>
      </Helmet>
      <NavMenu />
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
    </div>
  )
}

export default Home
