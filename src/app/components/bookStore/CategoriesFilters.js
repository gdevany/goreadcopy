import React, { PureComponent, PropTypes } from 'react'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'

class CategoriesFilters extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      subCategories: false,
      selectedCategory: '',
      isSubcategoriesOpen: false,
      isRatingOpen: false,
      isPriceOpen: false,
    }
    this.handleSubCategoriesClick = this.handleSubCategoriesClick.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
    this.handlePriceClick = this.handlePriceClick.bind(this)
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

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.categories) {
      this.setState({ subCategories: nextProps.categories })
    }
  }

  handleSubCategoriesClick = () => {
    this.setState({
      isSubcategoriesOpen: !this.state.isSubcategoriesOpen,
      isPriceOpen: false,
      isRatingOpen: false,
    })
  }

  handleRatingClick = () => {
    this.setState({
      isSubcategoriesOpen: false,
      isPriceOpen: false,
      isRatingOpen: !this.state.isRatingOpen
    })
  }

  handlePriceClick = () => {
    this.setState({
      isSubcategoriesOpen: false,
      isRatingOpen: false,
      isPriceOpen: !this.state.isPriceOpen
    })
  }

  handleSubCategories = () => {
    const { subCategories } = this.state
    return subCategories.map((category, index) => {
      return (
        <div
          key={`${index}_${category.id}`}
          className='categorypage-subcategory-filters'
        >
          <input
            id={category.slug}
            className='categorypage-category-selected'
            type='radio'
            name='category-filter'
            value={category.slug}
          />
          <label htmlFor={category.slug} className='categorypage-category-label'>
            {category.name}
          </label>
        </div>
      )
    })
  }
  renderSubCategoriesFilter = () => {
    const { selectedCategory, subCategories } = this.state
    return (
      <div className='categorypage-filter-popup-container'>
        <div className='categorypage-category-selected-container'>
          {/*<input*/}
            {/*className='categorypage-category-selected'*/}
            {/*id={selectedCategory}*/}
            {/*type='radio'*/}
            {/*name='category-filter'*/}
            {/*value={selectedCategory}*/}
          {/*/>*/}
          <label htmlFor={selectedCategory} className='categorypage-category-label'>
            {selectedCategory}
          </label>
        </div>
        <div className='categorypage-subcategories-filters-elems'>
          {subCategories ? this.handleSubCategories() : null}
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

  renderPriceFilter = () => {
    return (
      <div className='categorypage-filter-popup-container'>
        <div className='categorypage-filter-price-row'>
          <div className='categorypage-filter-price-row-element'>
            <input
              id='zero-to-ten'
              className='categorypage-filter-price-row-checkbox'
              type='checkbox'
              value='zero-to-ten'
            />
            <label
              htmlFor='zero-to-ten'
              className='categorypage-filter-price-label'
            >
              $0 - $10
            </label>
          </div>
          <div className='categorypage-filter-price-row-element'>
            <input
              id='ten-to-twentyfive'
              className='categorypage-filter-price-row-checkbox'
              type='checkbox'
              value='ten-to-twentyfive'
            />
            <label
              htmlFor='ten-to-twentyfive'
              className='categorypage-filter-price-label'
            >
              $10 - $25
            </label>
          </div>
          <div className='categorypage-filter-price-row-element'>
            <input
              id='twentyfive-to-fifty'
              className='categorypage-filter-price-row-checkbox'
              type='checkbox'
              value='twentyfive-to-fifty'
            />
            <label
              htmlFor='twentyfive-to-fifty'
              className='categorypage-filter-price-label'
            >
              $25 - $50
            </label>
          </div>
          <div className='categorypage-filter-price-row-element'>
            <input
              id='fifty-above'
              className='categorypage-filter-price-row-checkbox'
              type='checkbox'
              value='fifty-above'
            />
            <label
              htmlFor='fifty-above'
              className='categorypage-filter-price-label'
            >
              $50 - Above
            </label>
          </div>
        </div>
        <div className='categorypage-filter-price-row'>
          <div className='categorypage-filter-custom-price'>
            <span className='categorypage-filter-custom-price-title'>
              Set your own:
            </span>
            <div className='categorypage-filter-custom-inputs-container'>
              <span className='categorypage-filter-custom-input-dollar'>
                $
              </span>
              <input className='categorypage-filter-custom-input' type='number' min='0'/>
              <span className='categorypage-filter-custom-input-sepparator'>
                to
              </span>
              <span className='categorypage-filter-custom-input-dollar'>
                $
              </span>
              <input className='categorypage-filter-custom-input' type='number' min='0'/>
            </div>
          </div>
          <div className='categorypage-filter-price-submit-container'>
            <a className='categorypage-filter-price-submit'>
              Apply
            </a>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const { isSubcategoriesOpen, isRatingOpen, isPriceOpen } = this.state

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
            <span
              onClick={this.handlePriceClick}
              className='categorypage-single-filter-title'
            >
              Price
            </span>
            {isPriceOpen ? <ArrowUpIcon onClick={this.handlePriceClick}/> : <ArrowDownIcon />}
            {isPriceOpen ? this.renderPriceFilter() : null}
          </div>
          {/*<div className='categorypage-single-filter-container'>*/}
            {/*<span className='categorypage-single-filter-title'>*/}
              {/*Awards Categories*/}
            {/*</span>*/}
            {/*<ArrowDownIcon />*/}
          {/*</div>*/}
        </div>
      </section>
    )
  }
}

export default CategoriesFilters
