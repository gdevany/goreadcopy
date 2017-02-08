import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Quotes from '../../client/image/quotes.png'
import '../../client/styles/testimonial-carousel.scss'

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <div className='row carouselWrapper'>
      <Slider {...settings}>
        <div>
          <div className='row'>
            <div className='small-12 medium-4 columns center-text'>
              <img
                className='carouselImage'
                src='http://placehold.it/250x250'
                alt='Image'
              />
            </div>
            <div className='small-12 medium-8 columns'>
              <img
                className='carouselQuotesImage'
                src={Quotes}
              />
              <div className='carouselQuoteText'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec quis metus nec dolor venenatis blandit non vel mauris.
                  Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                  leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                  lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
                </p>
                <p>
                  - <span className='carouselQuoteOwnerText'>John E. Dip</span>
                  , <span>GoRead User</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='row'>
            <div className='small-12 medium-4 columns center-text'>
              <img
                className='carouselImage'
                src='http://placehold.it/250x250'
                alt='Image'
              />
            </div>
            <div className='small-12 medium-8 columns'>
              <img
                className='carouselQuotesImage'
                src={Quotes}
              />
              <div className='carouselQuoteText'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec quis metus nec dolor venenatis blandit non vel mauris.
                  Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                  leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                  lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
                </p>
                <p>
                  - <span className='carouselQuoteOwnerText'>John E. Dip</span>
                  , <span>GoRead User</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default TestimonialCarousel
