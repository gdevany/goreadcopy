import React from 'react';
import { connect } from 'react-redux';

class SubCategoriesFilterMenu extends React.Component {
  render () {
    const { categories, handleSelectedSubCategory } = this.props;
    const categoriesNodes = categories.map((category, index) => {
      return category ? (
        <div
          key={`sub-category_${category.id}`}
          className='categorypage-subcategory-filters'
        >
          <input
            id={category.slug}
            className='categorypage-category-selected'
            type='radio'
            name='category-filter'
            value={category.slug}
            onClick={() => handleSelectedSubCategory(category)}
          />
          <label
            htmlFor={category.slug}
            className='categorypage-category-label'
          >
            {category.name}
          </label>
        </div>
      ) : null
    });

    return (
      <div className='categorypage-subcategories-filters-elems'>
        {categories ? categoriesNodes : <span>No Subcategories</span>}
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  categories: state.store.childCategories || [],
});

// this is a big hack ... but is my last resort next time we have to refactor the entire store
export default connect(mapStateToProps)(SubCategoriesFilterMenu);
