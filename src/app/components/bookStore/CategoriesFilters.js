import React, { PureComponent } from 'react'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
// import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class CategoriesFilters extends PureComponent {
  render() {
    return (
      <section className='categorypage-main-filters-container'>
        <div className='categorypage-main-filters'>
          <div className='categorypage-single-filter-container-main'>
            <span className='categorypage-single-filter-title'>
              Filter by:
            </span>
          </div>
          <div className='categorypage-single-filter-container'>
            <span className='categorypage-single-filter-title'>
              Sub Categories
            </span>
            <ArrowDownIcon />
          </div>
          <div className='categorypage-single-filter-container'>
            <span className='categorypage-single-filter-title'>
              Rating
            </span>
            <ArrowDownIcon />
          </div>
          <div className='categorypage-single-filter-container'>
            <span className='categorypage-single-filter-title'>
              Price
            </span>
            <ArrowDownIcon />
          </div>
          <div className='categorypage-single-filter-container'>
            <span className='categorypage-single-filter-title'>
              Awards Categories
            </span>
            <ArrowDownIcon />
          </div>
        </div>
      </section>
    )
  }
}

export default CategoriesFilters
