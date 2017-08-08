import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

const SubCategories = ({ SubCategoriesElement, parentCategory }) => {

  const mapSubCategories = () => {
    return SubCategoriesElement.map((category, index) => {
      return (
        <Link
          to={`/categories/${parentCategory}/${category.slug}`}
          key={`${index}_${category.id}`}
          className='categorypage-subcategories-single-element'
        >
          {category.name}
        </Link>
      )
    })
  }
  return (
    <section className='categorypage-subcategories-container'>
      <h4 className='categorypage-subcategories-main-title'>
        Sub Categories
      </h4>
      <div className='categorypage-subcategories-elements-container'>
        {SubCategoriesElement ? mapSubCategories() : null}
      </div>
    </section>
  )
}

SubCategories.propTypes = {
  parentCategory: PropTypes.string,
  SubCategoriesElement: PropTypes.array
}

export default SubCategories
