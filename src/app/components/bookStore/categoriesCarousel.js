import React, { PureComponent } from 'react'
import Slider from 'react-slick'

const settings = {
  dots: true,
  accessibility: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  variableWidth: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 }
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 1200,
      settings: { slidesToShow: 5 }
    },
  ]
}
class CategoriesCarousel extends PureComponent {
  render() {
    return (
      <div className='categories-on-carousel-container'>
        <Slider {...settings}>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 2
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 3
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 4
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 5
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 6
            </span>
          </div>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
              Science Fiction 7
            </span>
          </div>
        </Slider>
      </div>
    )
  }
}

export default CategoriesCarousel
