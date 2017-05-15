import React, { PureComponent, PropTypes } from 'react'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class CategoriesFilters extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedCategory: '',
      isSubcategoriesOpen: false,
      isRatingOpen: false,
    }
    this.handleSubCategoriesClick = this.handleSubCategoriesClick.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount = () => {
    const { router } = this.context
    if (router.params.slug) {
      this.setState({
        selectedCategory: router.params.slug,
      })
    }
  }

  handleSubCategoriesClick = () => {
    this.setState({
      isSubcategoriesOpen: !this.state.isSubcategoriesOpen,
      isRatingOpen: false,
    })
  }

  handleRatingClick = () => {
    this.setState({
      isSubcategoriesOpen: false,
      isRatingOpen: !this.state.isRatingOpen
    })
  }

  renderSubCategoriesFilter = () => {
    const { selectedCategory } = this.state
    return (
      <div className='categorypage-filter-popup-container'>
        <div className='categorypage-category-selected-container'>
          <input
            className='categorypage-category-selected'
            id={selectedCategory}
            type='radio'
            name='category-filter'
            value={selectedCategory}
          />
          <label htmlFor={selectedCategory} className='categorypage-category-label'>
            {selectedCategory}
          </label>
        </div>
        <div className='categorypage-subcategories-filters-elems'>
          <div className='categorypage-subcategory-filters'>
            <input
              id='Action & Adventure'
              className='categorypage-category-selected'
              type='radio'
              name='category-filter'
              value='Action & Adventure'
            />
            <label htmlFor='Action & Adventure' className='categorypage-category-label'>
              Action & Adventure
            </label>
          </div>
          <div className='categorypage-subcategory-filters'>
            <input
              id='Alternative History'
              className='categorypage-category-selected'
              type='radio'
              name='category-filter'
              value='Alternative History'
            />
            <label htmlFor='Alternative History' className='categorypage-category-label'>
              Alternative History
            </label>
          </div>
          <div className='categorypage-subcategory-filters'>
            <input
              id='General'
              className='categorypage-category-selected'
              type='radio'
              name='category-filter'
              value='General'
            />
            <label htmlFor='General' className='categorypage-category-label'>
              General
            </label>
          </div>
          <div className='categorypage-subcategory-filters'>
            <input
              id='Military'
              className='categorypage-category-selected'
              type='radio'
              name='category-filter'
              value='Military'
            />
            <label htmlFor='Military' className='categorypage-category-label'>
              Military
            </label>
          </div>
        </div>
      </div>
    )
  }

  renderRatingFilter = () => {
    return (
      <div className='categorypage-filter-popup-container'>
        <div className='categorypage-filter-rating-element'>
          <input
            id='one-and-up'
            className='categorypage-rating-radio'
            type='radio'
            name='and-up'
            value='one-and-up'
          />
          <label htmlFor='one-and-up' className='categorypage-rating-label'>
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <span className='categorypage-rating-label-text'>
              & Up
            </span>
          </label>
        </div>
        <div className='categorypage-filter-rating-element'>
          <input
            id='two-and-up'
            className='categorypage-rating-radio'
            type='radio'
            name='and-up'
            value='two-and-up'
          />
          <label htmlFor='two-and-up' className='categorypage-rating-label'>
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <span className='categorypage-rating-label-text'>
              & Up
            </span>
          </label>
        </div>
        <div className='categorypage-filter-rating-element'>
          <input
            id='three-and-up'
            className='categorypage-rating-radio'
            type='radio'
            name='and-up'
            value='three-and-up'
          />
          <label htmlFor='three-and-up' className='categorypage-rating-label'>
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <span className='categorypage-rating-label-text'>
              & Up
            </span>
          </label>
        </div>
        <div className='categorypage-filter-rating-element'>
          <input
            id='four-and-up'
            className='categorypage-rating-radio'
            type='radio'
            name='and-up'
            value='four-and-up'
          />
          <label htmlFor='four-and-up' className='categorypage-rating-label'>
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-rating.png' />
            <img className='rating-icon' src='/image/star-empty.png' />
            <span className='categorypage-rating-label-text'>
              & Up
            </span>
          </label>
        </div>
      </div>
    )
  }

  render() {
    const { isSubcategoriesOpen, isRatingOpen } = this.state

    return (
      <section className='categorypage-main-filters-container'>
        <div className='categorypage-main-filters'>
          <div className='categorypage-single-filter-container-main'>
            <span className='categorypage-single-filter-title'>
              Filter by:
            </span>
          </div>
          <div className='categorypage-single-filter-container'>
            <span
              onClick={this.handleSubCategoriesClick}
              className='categorypage-single-filter-title'
            >
              Sub Categories
            </span>
            {isSubcategoriesOpen ?
              <ArrowUpIcon onClick={this.handleSubCategoriesClick}/> : <ArrowDownIcon />
            }
            {isSubcategoriesOpen ? this.renderSubCategoriesFilter() : null}
          </div>
          <div className='categorypage-single-filter-container'>
            <span
              onClick={this.handleRatingClick}
              className='categorypage-single-filter-title'
            >
              Rating
            </span>
            {isRatingOpen ?
              <ArrowUpIcon onClick={this.handleRatingClick} /> : <ArrowDownIcon />
            }
            {isRatingOpen ? this.renderRatingFilter() : null}
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
