import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const styles = {
  propContainer: {
    paddingTop: 150,
  },
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
    <div className='row' style={styles.propContainer}>
      <Slider {...settings}>
        <div>
          <div className='row'>
            <div className='small-12 medium-4 columns'>
              <img style={{ borderRadius: 150 }} src='http://placehold.it/300x300' alt='Image'/>
            </div>
            <div className='small-12 medium-8 columns'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec quis metus nec dolor venenatis blandit non vel mauris.
                Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
              </p>
              <p>
                - <span>John E. Dip</span>
                , <span>GoRead User</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='row'>
            <div className='small-12 medium-4 columns'>
              <img style={{ borderRadius: 150 }} src='http://placehold.it/300x300' alt='Image'/>
            </div>
            <div className='small-12 medium-8 columns'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec quis metus nec dolor venenatis blandit non vel mauris.
                Phasellus et lobortis erat. Quisque quis ipsum erat. Donec venenatis
                leo in tincidunt facilisis. Integer a sapien eget lorem facilisis
                lobortis. Pellentesque lacinia ex sit amet sapien blandit faucibus.
              </p>
              <p>
                - <span>John E. Dip</span>
                , <span>GoRead User</span>
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default TestimonialCarousel
