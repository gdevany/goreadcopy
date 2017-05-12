import React, { PropTypes } from 'react'

const CategoriesHero = ({ categoryElement }) => {
  return (
    <section className='categorypage-hero-main-container'>
      <div className='categorypage-hero-container'>
        <ul className='categorypage-hero-breadcrumbs'>
          <li className='categorypage-hero-breadcrumbs-element'>
            <a className='categorypage-hero-breadcrumbs-anchor'>
              Fiction
            </a>
          </li>
          <li className='categorypage-hero-breadcrumbs-element'>
            <span className='categorypage-hero-breadcrumbs-element-separator'>
              >
            </span>
          </li>
          <li className='categorypage-hero-breadcrumbs-element'>
            <a className='categorypage-hero-breadcrumbs-anchor'>
              Science Fiction
            </a>
          </li>
        </ul>
        <div className='categorypage-hero-bottom-elements-container'>
          <h1 className='categorypage-hero-title'>
            Science Fiction
          </h1>
          <div className='categorypage-hero-bottom-right-elements'>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Favorited
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                12,843
              </span>
            </div>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Books
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                2,823
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CategoriesHero.propTypes = {
  categoryElement: PropTypes.object
}

export default CategoriesHero
