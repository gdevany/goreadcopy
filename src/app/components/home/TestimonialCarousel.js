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
    zIndex: 10,
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
    <div style={styles.carouselContainer} className='row box carousel-wrapper'>
      <Slider autoplay={true} autoplaySpeed={5000} {...settings}>

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
                  Finding a community of people who love books as much as I do was amazing.
                  I love being a part of three book clubs at once!
                </p>
                <p>
                  - <span className='carousel-quote-owner-text'>Mary Reynolds</span>
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
                  I’m a reader and an author, so being able to discover great
                  new books and grow my audience in one platform is a dream come true.
                </p>
                <p>
                  - <span className='carousel-quote-owner-text'>John Cushing</span>
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
                  GoRead has every book I’m looking for. I probably buy a book per week!
                </p>
                <p>
                  - <span className='carousel-quote-owner-text'>Jessica Lopez</span>
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
