import React, { PropTypes } from 'react'

const SubCategories = ({ SubCategoriesElement }) => {

  const mapSubCategories = () => {
    return SubCategoriesElement.map((category, index) => {
      return (
        <a
          href={`/subcategories/${category.slug}`}
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
  SubCategoriesElement: PropTypes.array
}

export default SubCategories
