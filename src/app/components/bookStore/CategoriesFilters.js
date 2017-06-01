import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../redux/actions'
import Book from './Book'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import ArrowUpIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import { slide as FiltersMenu } from 'react-burger-menu'

const { filterBooks } = Store
const styles = {
  filtersMenu: {
    left: 0,
    top: 0,
  },
}

class CategoriesFilters extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      filtersMenuOpen: false,
      subCategories: this.props.categories,
      categoryId: this.props.categoryId,
      selectedCategory: '',
      filterResults: false,
      isSubcategoriesOpen: false,
      selectedSubCategory: false,
      selectedRating: false,
      selectedMinPrice: false,
      selectedMaxPrice: false,
      isRatingOpen: false,
      isPriceOpen: false,
      customMinPrice: '',
      customMaxPrice: '',
    }
    this.handleSubCategoriesClick = this.handleSubCategoriesClick.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
    this.handlePriceClick = this.handlePriceClick.bind(this)
    this.handleSelectedSubCategory = this.handleSelectedSubCategory.bind(this)
    this.handleSelectedRating = this.handleSelectedRating.bind(this)
    this.handleSelectedPrice = this.handleSelectedPrice.bind(this)
    this.handleRemoveSelectedCategory = this.handleRemoveSelectedCategory.bind(this)
    this.handleRemoveSelectedPrice = this.handleRemoveSelectedPrice.bind(this)
    this.handleRemoveSelectedRating = this.handleRemoveSelectedRating.bind(this)
    this.handleCustomPriceClick = this.handleCustomPriceClick.bind(this)
    this.handleCustomPriceChange = this.handleCustomPriceChange.bind(this)
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
    if (nextProps.filterResults !== this.state.filterResults) {
      this.setState({ filterResults: nextProps.filterResults })
    }
  }

  componentWillUpdate = (nextProps, nextState) => {
    const {
      selectedSubCategory,
      selectedRating,
      selectedMinPrice,
      selectedMaxPrice
    } = nextState
    if (selectedRating !== this.state.selectedRating ||
      selectedSubCategory !== this.state.selectedSubCategory ||
      selectedMinPrice !== this.state.selectedMinPrice ||
      selectedMaxPrice !== this.state.selectedMaxPrice) {

      this.handleFilter(selectedSubCategory, selectedRating, selectedMinPrice, selectedMaxPrice)
    }
  }

  handleFilterMenuClick = (event) => {
    event.preventDefault()
    this.setState({
      filtersMenuOpen: !this.state.filtersMenuOpen,
    })
  }

  handleSubCategoriesClick = () => {
    this.setState({
      isSubcategoriesOpen: true,
      isPriceOpen: false,
      isRatingOpen: false,
    })
  }

  handleRatingClick = () => {
    this.setState({
      isSubcategoriesOpen: false,
      isPriceOpen: false,
      isRatingOpen: true
    })
  }

  handlePriceClick = () => {
    this.setState({
      isSubcategoriesOpen: false,
      isRatingOpen: false,
      isPriceOpen: true
    })
  }

  handleSubCategoriesHide = () => this.setState({ isSubcategoriesOpen: false })

  handleRatingHide = () => this.setState({ isRatingOpen: false })

  handlePriceHide = () => this.setState({ isPriceOpen: false })

  handleRemoveSelectedCategory = () => {
    this.setState({ selectedSubCategory: false })
  }

  handleRemoveSelectedRating = () => {
    this.setState({ selectedRating: false })
  }

  handleRemoveSelectedPrice = () => {
    this.setState({
      selectedMinPrice: false,
      selectedMaxPrice: false,
    })
  }

  handleSelectedSubCategory = (filter) => {
    event.preventDefault()
    this.setState({
      selectedSubCategory: {
        name: filter.name,
        id: filter.id,
      },
      filtersMenuOpen: false,
    })
  }

  handleSelectedRating = (filter) => {
    this.setState({
      selectedRating: filter,
      filtersMenuOpen: false,
    })
  }

  handleSelectedPrice = (minFilter, maxFilter) => {
    this.setState({
      selectedMinPrice: minFilter,
      selectedMaxPrice: maxFilter,
      filtersMenuOpen: false,
    })
  }

  handleCustomPriceChange = (event, priceType) => {
    event.preventDefault()
    if (priceType === 1) {
      this.setState({ customMinPrice: event.target.value })
    }
    if (priceType === 2) {
      this.setState({ customMaxPrice: event.target.value })
    }
  }

  handleCustomPriceClick = (event) => {
    event.preventDefault()
    this.setState({
      selectedMinPrice: this.state.customMinPrice,
      selectedMaxPrice: this.state.customMaxPrice,
      isPriceOpen: false,
      filtersMenuOpen: false,
    })
  }

  handleFilter = (selectedSubCategory, selectedRating, selectedMinPrice, selectedMaxPrice) => {
    const { categoryId } = this.state
    this.setState({ filterResults: 'loading' })
    if (selectedSubCategory || selectedMinPrice || selectedMaxPrice || selectedRating) {
      if (selectedRating) {
        switch (selectedRating) {
          case 'one-and-up':
            this.props.filterBooks({
              genreIds: selectedSubCategory ? selectedSubCategory.id : categoryId,
              minRate: selectedRating ? 1 : null,
              maxRate: selectedRating ? 5 : null,
              minPrice: selectedMinPrice !== false && selectedMinPrice >= 0 ?
                selectedMinPrice : null,
              maxPrice: selectedMaxPrice && selectedMaxPrice !== 'more' ?
                selectedMaxPrice : null,
            })
            break
          case 'two-and-up':
            this.props.filterBooks({
              genreIds: selectedSubCategory ? selectedSubCategory.id : categoryId,
              minRate: selectedRating ? 2 : null,
              maxRate: selectedRating ? 5 : null,
              minPrice: selectedMinPrice !== false && selectedMinPrice >= 0 ?
                selectedMinPrice : null,
              maxPrice: selectedMaxPrice && selectedMaxPrice !== 'more' ?
                selectedMaxPrice : null,
            })
            break
          case 'three-and-up':
            this.props.filterBooks({
              genreIds: selectedSubCategory ? selectedSubCategory.id : categoryId,
              minRate: selectedRating ? 3 : null,
              maxRate: selectedRating ? 5 : null,
              minPrice: selectedMinPrice !== false && selectedMinPrice >= 0 ?
                selectedMinPrice : null,
              maxPrice: selectedMaxPrice && selectedMaxPrice !== 'more' ?
                selectedMaxPrice : null
            })
            break
          case 'four-and-up':
            this.props.filterBooks({
              genreIds: selectedSubCategory ? selectedSubCategory.id : categoryId,
              minRate: selectedRating ? 4 : null,
              maxRate: selectedRating ? 5 : null,
              minPrice: selectedMinPrice !== false && selectedMinPrice >= 0 ?
                selectedMinPrice : null,
              maxPrice: selectedMaxPrice && selectedMaxPrice !== 'more' ?
                selectedMaxPrice : null,
            })
            break
        }
      } else {
        this.props.filterBooks({
          genreIds: selectedSubCategory ? selectedSubCategory.id : categoryId,
          minRate: selectedRating ? 4 : null,
          maxRate: selectedRating ? 5 : null,
          minPrice: selectedMinPrice !== false && selectedMinPrice >= 0 ?
            selectedMinPrice : null,
          maxPrice: selectedMaxPrice && selectedMaxPrice !== 'more' ?
            selectedMaxPrice : null,
        })
      }
    }
  }

  renderSelectedCategory = () => {
    const { selectedSubCategory } = this.state
    return (
      <a
        onClick={this.handleRemoveSelectedCategory}
        className='categorypage-selected-filter-element'
      >
        <span className='categorypage-selected-filter-remove'> x </span>
        <span className='categorypage-selected-filter-subcategory'>
          {selectedSubCategory.name}
        </span>
      </a>
    )
  }

  renderSelectedRating = () => {
    const { selectedRating } = this.state
    switch (selectedRating) {
      case 'one-and-up':
        return (
          <a className='categorypage-selected-filter-element'>
            <span
              onClick={this.handleRemoveSelectedRating}
              className='categorypage-selected-filter-remove'
            >
              x
            </span>
            <span className='categorypage-selected-filter-rating'>
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
            </span>
            <span className='categorypage-selected-filter-rating-up'>
              & Up
            </span>
          </a>
        )
      case 'two-and-up':
        return (
          <a className='categorypage-selected-filter-element'>
            <span
              onClick={this.handleRemoveSelectedRating}
              className='categorypage-selected-filter-remove'
            >
              x
            </span>
            <span className='categorypage-selected-filter-rating'>
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
            </span>
            <span className='categorypage-selected-filter-rating-up'>
              & Up
            </span>
          </a>
        )
      case 'three-and-up':
        return (
          <a className='categorypage-selected-filter-element'>
            <span
              onClick={this.handleRemoveSelectedRating}
              className='categorypage-selected-filter-remove'
            >
              x
            </span>
            <span className='categorypage-selected-filter-rating'>
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
            </span>
            <span className='categorypage-selected-filter-rating-up'>
              & Up
            </span>
          </a>
        )
      case 'four-and-up':
        return (
          <a className='categorypage-selected-filter-element'>
            <span
              onClick={this.handleRemoveSelectedRating}
              className='categorypage-selected-filter-remove'
            >
              x
            </span>
            <span className='categorypage-selected-filter-rating'>
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-rating.png' />
              <img className='rating-icon' src='/image/star-empty.png' />
            </span>
            <span className='categorypage-selected-filter-rating-up'>
              & Up
            </span>
          </a>
        )
      default :
        return null
    }
  }

  renderSelectedPrice = () => {
    const { selectedMinPrice, selectedMaxPrice } = this.state
    return (
      <a className='categorypage-selected-filter-element'>
        <span
          onClick={this.handleRemoveSelectedPrice}
          className='categorypage-selected-filter-remove'
        >
          x
        </span>
        <span className='categorypage-selected-filter-prices'>
          {`$${selectedMinPrice} - $${selectedMaxPrice}`}
        </span>
      </a>
    )

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
            onClick={() => this.handleSelectedSubCategory(category)}
          />
          <label
            htmlFor={category.slug}
            className='categorypage-category-label'
          >
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
          {subCategories ? this.handleSubCategories() : <span>No Subcategories</span>}
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
            onClick={() => this.handleSelectedRating('one-and-up')}
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
            onClick={() => this.handleSelectedRating('two-and-up')}
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
            onClick={() => this.handleSelectedRating('three-and-up')}
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
            onClick={() => this.handleSelectedRating('four-and-up')}
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
              type='radio'
              value='zero-to-ten'
              onClick={() => this.handleSelectedPrice(0, 10)}
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
              type='radio'
              value='ten-to-twentyfive'
              onClick={() => this.handleSelectedPrice(10, 25)}
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
              type='radio'
              value='twentyfive-to-fifty'
              onClick={() => this.handleSelectedPrice(25, 50)}
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
              type='radio'
              value='fifty-above'
              onClick={() => this.handleSelectedPrice(50, 'more')}
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
              <input
                onChange={(event) => this.handleCustomPriceChange(event, 1)}
                className='categorypage-filter-custom-input'
                type='number'
                min='0'
                value={this.state.customMinPrice}
              />
              <span className='categorypage-filter-custom-input-sepparator'>
                to
              </span>
              <span className='categorypage-filter-custom-input-dollar'>
                $
              </span>
              <input
                onChange={(event) => this.handleCustomPriceChange(event, 2)}
                className='categorypage-filter-custom-input'
                type='number'
                min='0'
                value={this.state.customMaxPrice}
              />
            </div>
          </div>
          <div className='categorypage-filter-price-submit-container'>
            <a
              onClick={this.handleCustomPriceClick}
              className='categorypage-filter-price-submit'
            >
              Apply
            </a>
          </div>
        </div>
      </div>
    )
  }

  renderFilterResults = () => {
    const { filterResults } = this.state
    if (filterResults && filterResults !== 'loading' && filterResults.results.length) {
      return filterResults.results.map((book, index) => {
        return (
          <Book
            key={`${book.id}_${index}`}
            url={`/book/${book.slug}`}
            image={book.imageUrl}
            id={book.id}
            title={book.title}
            authors={book.authors}
            rating={book.rating}
          />
        )
      })
    }
    if (filterResults && filterResults.results && !filterResults.results.length) {
      return <div>No Results</div>
    }
    return <div className='loading-animation-store'/>
  }

  render() {
    const {
      isSubcategoriesOpen,
      isRatingOpen,
      isPriceOpen,
      selectedSubCategory,
      selectedRating,
      selectedMinPrice,
      selectedMaxPrice,
      filterResults,
    } = this.state
    console.log()
    return (
      <section className='categorypage-filters'>
        <section className='categorypage-main-filters-container'>
          <div className='categorypage-main-filters'>
            <div className='categorypage-single-filter-container-main'>
            <span className='categorypage-single-filter-title'>
              Filter by:
            </span>
            </div>
            {!this.props.isSubCategory ?
              (
                <div
                  onClick={this.handleSubCategoriesClick}
                  className='categorypage-single-filter-container'
                  onMouseLeave={this.handleSubCategoriesHide}
                >
                  <span
                    className='categorypage-single-filter-title'
                  >
                    Sub Categories
                  </span>
                  {isSubcategoriesOpen ?
                    <ArrowUpIcon onClick={this.handleSubCategoriesClick}/> : <ArrowDownIcon />
                  }
                  {isSubcategoriesOpen ? this.renderSubCategoriesFilter() : null}
                </div>
              ) : null
            }
            <div
              onClick={this.handleRatingClick}
              className='categorypage-single-filter-container'
              onMouseLeave={this.handleRatingHide}
            >
              <span className='categorypage-single-filter-title'>
                Rating
              </span>
              {isRatingOpen ?
                <ArrowUpIcon onClick={this.handleRatingClick} /> : <ArrowDownIcon />
              }
              {isRatingOpen ? this.renderRatingFilter() : null}
            </div>
            <div
              onClick={this.handlePriceClick}
              className='categorypage-single-filter-container'
              onMouseLeave={this.handlePriceHide}
            >
              <span
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
        <section className='categorypage-main-filters-mobile-container'>
          <a
            onClick={this.handleFilterMenuClick}
            className='categorypage-main-filters-mobile-filter-button'
          >
            Filter
          </a>
          <FiltersMenu
            customBurgerIcon={false}
            customCrossIcon={false}
            id={'categorypage-main-filters-mobile-menu'}
            isOpen={this.state.filtersMenuOpen}
            style={styles.filtersMenu}
            right
          >
            <div className='categorypage-mobile-filters-render'>
              <span className='categorypage-mobile-filters-title'>Sub Categories Filter</span>
              {this.renderSubCategoriesFilter()}
              <span className='categorypage-mobile-filters-title'>Rating Filter</span>
              {this.renderRatingFilter()}
              <span className='categorypage-mobile-filters-title'>Price Filter</span>
              {this.renderPriceFilter()}
            </div>
          </FiltersMenu>
        </section>
        <section className='categorypage-filters-results-container'>
          {selectedSubCategory || selectedRating || selectedMinPrice || selectedMaxPrice ?
            (
              <div className='categorypage-selected-filters-container'>
                {selectedSubCategory !== false ? this.renderSelectedCategory() : null}
                {selectedRating !== false ? this.renderSelectedRating() : null}
                {selectedMinPrice !== false && selectedMaxPrice !== false ?
                  this.renderSelectedPrice() : null
                }
              </div>
            ) : null
          }
          {filterResults ?
            (
              <div className='categorypage-filter-results' >
                {this.renderFilterResults()}
              </div>
            ) : null
          }
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filterResults: state.store.bookFilterResults
  }
}

export default connect(mapStateToProps, { filterBooks })(CategoriesFilters)
