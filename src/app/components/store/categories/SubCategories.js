import React, { PropTypes } from 'react'

const SubCategories = ({ SubCategoriesElement, parentCategory }) => {

  const mapSubCategories = () => {
    return SubCategoriesElement.map((category, index) => {
      return (
        <a
          href={`/categories/${parentCategory}/${category.slug}`}
          key={`${index}_${category.id}`}
          className='categorypage-subcategories-single-element'
        >
          {category.name}
        </a>
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
