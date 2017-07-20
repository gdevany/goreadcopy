import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'

const settings = {
  dots: false,
  accessibility: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  variableWidth: true,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      }
    },
  ]
}
class CategoriesCarousel extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      categories: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.categories) {
      this.setState({
        categories: nextProps.categories,
      })
    }
  }

  renderCategories = () => {
    const { categories } = this.state
    return categories.map((category, index) => {
      return (
        <a key={category.id} href={`/categories/${category.slug}`}>
          <div className='category-on-carousel-square'>
            <span className='category-on-carousel-name'>
                {category.name}
            </span>
          </div>
        </a>
      )
    })
  }

  render() {
    if (this.state.categories) {
      return (
        <div className='categories-on-carousel-container'>
          <Slider {...settings}>
            {this.renderCategories()}
          </Slider>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.store.popularCategories,
  }
}

export default connect(mapStateToProps, null)(CategoriesCarousel)
