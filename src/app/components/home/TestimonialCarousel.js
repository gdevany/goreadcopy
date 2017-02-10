import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Quotes from '../../../client/image/quotes.png'
import '../../../client/styles/testimonial-carousel.scss'

const styles = {
  carouselContainer: {
    position: 'relative',
    width: '80%',
    zIndex: 0,
  },

  portraitRow: {
    padding: '50px 50px 0 50px',
  },

  carouselQuotesImage: {
    marginTop: 20,
  }
}

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
    <div style={styles.carouselContainer} className='row carousel-wrapper'>
      <Slider autoplay={true} {...settings}>

        <div>
          <div style={styles.portraitRow} className='row'>
            <div className='small-12 medium-4 columns center-text'>
              <img
                className='carousel-image'
                style={styles.carouselQuotesImage}
                src='./image/portrait.jpg'
                alt='Image'
              />
            </div>

            <div className='small-12 medium-8 columns'>
              <img
                className='carousel-quotes-image'
                src={Quotes}
              />

              <div className='carousel-quote-text'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec quis metus nec dolor venenatis blandit non vel mauris.
                  Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                  leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                  lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
                </p>
                <p>
                  - <span className='carouse-quote-owner-text'>Mary Reynolds</span>
                  , <span>GoRead User</span>
                </p>
              </div>

            </div>
          </div>
        </div>

        <div>
          <div style={styles.portraitRow} className='row'>
            <div className='small-12 medium-4 columns center-text'>
              <img
                className='carousel-image'
                src='./image/portrait2.png'
                style={styles.carouselQuotesImage}
                alt='Image'
              />
            </div>

            <div className='small-12 medium-8 columns'>
              <img
                className='carousel-quotes-image'
                src={Quotes}
              />
              <div className='carousel-quote-text'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec quis metus nec dolor venenatis blandit non vel mauris.
                  Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                  leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                  lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
                </p>
                <p>
                  - <span className='carousel-quote-owner-text'>John E. Dip</span>
                  , <span>GoRead User</span>
                </p>
              </div>

            </div>
          </div>

        </div>

        <div>
          <div style={styles.portraitRow} className='row'>
            <div className='small-12 medium-4 columns center-text'>
              <img
                className='carousel-image'
                src='./image/portrait3.png'
                alt='Image'
              />
            </div>

            <div className='small-12 medium-8 columns'>
              <img
                className='carousel-quotes-image'
                style={styles.carouselQuotesImage}
                src={Quotes}
              />
              <div className='carousel-quote-text'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec quis metus nec dolor venenatis blandit non vel mauris.
                  Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                  leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                  lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
                </p>
                <p>
                  - <span className='carousel-quote-owner-text'>Ayesha Curry</span>
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
