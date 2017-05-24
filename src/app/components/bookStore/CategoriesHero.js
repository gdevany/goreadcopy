import React, { PropTypes } from 'react'

const CategoriesHero = ({ category }) => {
  return (
    <section className='categorypage-hero-main-container'>
      <div className='categorypage-hero-container'>
        <ul className='categorypage-hero-breadcrumbs'>
          <li className='categorypage-hero-breadcrumbs-element'>
            <a className='categorypage-hero-breadcrumbs-anchor'>
              {category.name}
            </a>
          </li>
          {/*<li className='categorypage-hero-breadcrumbs-element'>*/}
            {/*<span className='categorypage-hero-breadcrumbs-element-separator'>*/}
              {/*>*/}
            {/*</span>*/}
          {/*</li>*/}
          {/*<li className='categorypage-hero-breadcrumbs-element'>*/}
            {/*<a className='categorypage-hero-breadcrumbs-anchor'>*/}
              {/*Science Fiction*/}
            {/*</a>*/}
          {/*</li>*/}
        </ul>
        <div className='categorypage-hero-bottom-elements-container'>
          <h1 className='categorypage-hero-title'>
            {category.name}
          </h1>
          <div className='categorypage-hero-bottom-right-elements'>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Favorited
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                {category.booksCount.toLocaleString()}
              </span>
            </div>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Books
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                {category.favoritedCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CategoriesHero.propTypes = {
  category: PropTypes.object
}

export default CategoriesHero
