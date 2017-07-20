import React from 'react'
import PropTypes from 'prop-types'

const CategoriesHero = ({ isSubCategory, subCategoryObject, category }) => {
  return (
    <section className='categorypage-hero-main-container'>
      <div className='categorypage-hero-container'>
        <ul className='categorypage-hero-breadcrumbs'>
          <li className='categorypage-hero-breadcrumbs-element'>
            <a
              href={`/categories/${category.slug}`}
              className='categorypage-hero-breadcrumbs-anchor'
            >
              {category.name}
            </a>
          </li>
          {isSubCategory ?
            (
            <li className='categorypage-hero-breadcrumbs-element'>
            <span className='categorypage-hero-breadcrumbs-element-separator'>
              >
            </span>
            </li>
            ) : null
          }
          {isSubCategory ?
            (
              <li className='categorypage-hero-breadcrumbs-element'>
                <a className='categorypage-hero-breadcrumbs-anchor'>
                  {subCategoryObject.name}
                </a>
              </li>
            ) : null
          }
        </ul>
        <div className='categorypage-hero-bottom-elements-container'>
          <h1 className='categorypage-hero-title'>
            {isSubCategory ? subCategoryObject.name : category.name}
          </h1>
          <div className='categorypage-hero-bottom-right-elements'>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Favorited
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                {isSubCategory ?
                  subCategoryObject.favoritedCount.toLocaleString() :
                  category.favoritedCount.toLocaleString()
                }
              </span>
            </div>
            <div className='categorypage-hero-bottom-right-data'>
              <span className='categorypage-hero-bottom-right-data-title'>
                Books
              </span>
              <span className='categorypage-hero-bottom-right-data-number'>
                {isSubCategory ?
                  subCategoryObject.booksCount.toLocaleString() :
                  category.booksCount.toLocaleString()
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

CategoriesHero.propTypes = {
  isSubCategory: PropTypes.bool,
  subCategoryObject: PropTypes.object,
  category: PropTypes.object,
}

export default CategoriesHero
