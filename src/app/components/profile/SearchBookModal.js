import React, { Component } from 'react'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { Search, ProfilePage } from '../../redux/actions'
import { debounce } from 'lodash'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Book from './Book'
import { Colors } from '../../constants/style'
import R from 'ramda'
import ShippingAddressModal from './shippingAddressModal'

const { bookSearch, updateBookSearch } = Search

const { addToLibrary, addToWishList } = ProfilePage

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },
  refresh: {
    position: 'absolute',
    left: '45%',
    top: '10px',
    transform: 'none',
  },
}

class SearchBookModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      userId: '',
      context: '',
      shippingAddressModal: false,
      isFilterOpen: false,
      selectedFilter: 'Books',
    }
    this.handleSeach = this.handleSeach.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleSelectFilter = this.handleSelectFilter.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      userId: nextProps.userId,
      context: nextProps.context,
    })
  }

  handleAddToLibrary = (bookEan) => {
    const { userId } = this.state
    this.props.addToLibrary(bookEan, userId, 'readfeed')
  }

  handleAddToWishList = (bookEan) => {
    const { userId } = this.state
    const { shippingAddress } = this.props.currentReader
    if (shippingAddress === null) {
      this.setState({ shippingAddressModal: true })
    } else {
      this.props.addToWishList(bookEan, userId)
    }
  }

  handleShippingAddressModalClose = () => {
    this.setState({ shippingAddressModal: false })
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  handleFilter = (event) => {
    event.preventDefault()
    if (!this.state.isFilterOpen) {
      this.setState({
        isFilterOpen: true
      })
    } else {
      this.setState({
        isFilterOpen: false
      })
    }

  }

  handleSelectFilter = (filterType) => {
    this.setState({
      selectedFilter: filterType,
      isFilterOpen: false,
    })
    if (filterType !== 'Select Filter' && this.state.searchTerm.length > 3) {
      let filter
      if (this.state.selectedFilter === 'Authors') {
        filter = 'author'
      } else {
        filter = 'title'
      }
      this.props.bookSearch(this.state.searchTerm, filter)
    }
  }

  handleSeach = R.curry((field, e) => {
    e.persist()
    this.setState({ [field]: e.target.value })
    this.debouncedSearch(e)
  })

  debouncedSearch = debounce((event) => {

    if (event.target.value.length > 3) {
      if (this.state.selectedFilter === 'Select Filter') {
        this.props.bookSearch(event.target.value)
      } else {
        let filter
        if (this.state.selectedFilter === 'Authors') {
          filter = 'author'
        } else {
          filter = 'title'
        }
        this.props.bookSearch(event.target.value, filter)
      }
    }
  }, 1000)

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms) {
      const bookResults = searchTerms.results.map((book, index) => {
        return (
          <Book
            key={`${book.ean}_${index}`}
            url={book.link}
            image={book.imageUrl}
            id={book.ean}
            title={book.title}
            rating={book.rating}
            authors={book.authors}
            bookType={this.state.context}
            addAction={() => {
              if (this.state.context === 'librarySearch') {
                this.handleAddToLibrary(book.ean)
              } else {
                this.handleAddToWishList(book.ean)
              }
            }}

          />
        )
      })
      return (
        <div className='search-results'>
          <div className='book-search-results-container'>
            {bookResults ? (
              <div className='search-book-results'>{bookResults}</div>
            ) : null}
          </div>
        </div>
      )
    }
    return (
      <div className='refresh-indicator-container'>
        {this.state.searchTerm !== '' && this.state.searchTerm.length > 3 ?
        (
          <RefreshIndicator
            size={50}
            left={70}
            top={0}
            loadingColor={Colors.blue}
            status='loading'
            style={styles.refresh}
          />
        ) : null}
      </div>
    )
  }
  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props
    return (
      <div>
        <Dialog
          bodyClassName='complete-profile-books-modal'
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-12 large-12 collumns small-centered'>
                  <h2 className='searchbooks-readfeeed-title'>Search Books</h2>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    {this.state.context === 'librarySearch' ?
                      (
                        'Add them to your library and earn Litcoins'
                      ) : (
                        'Add them to your wishlist'
                      )
                    }
                  </h4>
                </div>
                <div
                  className='form-wrapper general-font small-12 large-10 collumns small-centered'
                >
                  <div className='row'>
                    <div className='small-12 columns search-books-on-readfeed'>
                      <form onKeyPress={this.handleEnterButton} className='search-books-form'>
                        <input
                          type='text'
                          className='form-input'
                          placeholder='Search'
                          onChange={this.handleSeach('searchTerm')}
                          value={this.state.searchTerm}
                          autoFocus
                        />
                        <div className='search-book-filters'>
                          <div className='filter-inside-input'>
                            <a
                              onClick={this.handleFilter}
                            >
                              {this.state.selectedFilter}
                            </a>
                          </div>
                          {
                            this.state.isFilterOpen ?
                            (
                              <ul className='search-book-filters-container'>
                                <li className='search-book-filters-list'>
                                  <a
                                    onClick={() => this.handleSelectFilter('Select Filter')}
                                  >
                                    -----
                                  </a>
                                </li>
                                <li className='search-book-filters-list'>
                                  <a
                                    onClick={() => this.handleSelectFilter('Books')}
                                  >
                                    Books
                                  </a>
                                </li>
                                <li className='search-book-filters-list'>
                                  <a
                                    onClick={() => this.handleSelectFilter('Authors')}
                                  >
                                    Authors
                                  </a>
                                </li>
                              </ul>
                            ) : null
                          }
                        </div>
                      </form>
                      <div className='search-results-container'>
                        { this.renderSearchResults() }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ShippingAddressModal
            modalOpen={this.state.shippingAddressModal}
            handleClose={this.handleShippingAddressModalClose}
          />
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentReader: {
      shippingAddress: state.currentReader.shippingAddress,
    },
    searchResults: state.search.bookSearch
  }
}
const mapDistpachToProps = {
  bookSearch,
  updateBookSearch,
  addToLibrary,
  addToWishList,
}
export default connect(mapStateToProps, mapDistpachToProps)(SearchBookModal)
