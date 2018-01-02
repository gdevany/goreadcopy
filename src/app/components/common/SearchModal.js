import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Dialog, } from 'material-ui'
import R from 'ramda'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Search } from '../../redux/actions'
import { debounce } from 'lodash'

const { mainSearch, cleanSearchState } = Search

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
    display: 'inline-block',
    position: 'relative',
  },
}

class SearchModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      isFilterOpen: false,
      selectedFilter: 'Book',
      selectedSubFilter: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleSelectFilter = this.handleSelectFilter.bind(this)

  }

  handleOnChange = R.curry((field, e) => {
    e.persist()
    this.setState({
      [field]: e.target.value,
      isFilterOpen: false,
    })
    this.debouncedSearch(e)
  })

  closeFilterModal = (event) => {
    event.preventDefault()
    this.setState({
      isFilterOpen: false
    })
  }

  debouncedSearch = debounce((event) => {
    if (event.target.value.length > 3) {
      this.props.cleanSearchState()
      if (this.state.selectedFilter === 'Select Filter') {
        this.props.mainSearch(event.target.value, 'book')
      } else {
        let filter
        if (this.state.selectedFilter === 'Author') {
          filter = 'author'
        } else if (this.state.selectedFilter === 'Book') {
          filter = 'book'
        } else if (this.state.selectedFilter === 'Reader') {
          filter = 'reader'
        } else if (this.state.selectedFilter === 'Publisher') {
          filter = 'publisher'
        } else {
          filter = 'book'
        }
        this.props.mainSearch(event.target.value, filter, this.state.selectedSubFilter)
      }
    }
  }, 1000)

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

  handleSelectFilter = (filterType, subFilter) => {
    const selectedSubFilter = subFilter ? subFilter.toLowerCase() : false
    let filter
    if (filterType === 'Author') {
      filter = 'author'
    } else if (filterType === 'Book') {
      filter = 'book'
    } else if (filterType === 'Reader') {
      filter = 'reader'
    } else if (filterType === 'Publisher') {
      filter = 'publisher'
    } else {
      filter = 'book'
    }
    this.setState({
      selectedFilter: filterType,
      selectedSubFilter: selectedSubFilter,
      isFilterOpen: false,
    })
    if (filterType !== 'Select Filter' && this.state.searchTerm.length > 3) {
      this.props.cleanSearchState()
      this.props.mainSearch(this.state.searchTerm, filter, this.state.selectedSubFilter)
    }
  }

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms.counts) {
      let readerResults
      let authorResults
      let publisherResults
      let bookResults

      if (searchTerms.readers) {
        readerResults = searchTerms.readers.map((reader, index) => {
          return (
            <div key={reader.id} className='result-container'>
              <div className='image-container'>
                <Link to={`/profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
                  <figure className='search-result-figure'>
                    <img
                      src={reader.image}
                      className='search-result-image'
                      alt={reader.slug}
                    />
                  </figure>
                </Link>
              </div>
              <div className='search-result-info-container'>
                <Link to={`/profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
                  {reader.firstName} {reader.lastName}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/profile/${reader.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  Personal Library
                </Link>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.authors) {
        authorResults = searchTerms.authors.map((author, index) => {
          return (
            <div key={author.id} className='result-container'>
              <div className='image-container'>
                <a href={author.url}>
                  <figure className='search-result-figure'>
                    <img
                      src={author.image}
                      className='search-result-image'
                      alt={author.slug}
                    />
                  </figure>
                </a>
              </div>
              <div className='search-result-info-container'>
                <a href={author.url}>
                  {author.firstName} {author.lastName}
                </a>
                <br/>
                <a className='search-type-anchor' href={author.url}>
                  Author
                </a>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.books) {
        bookResults = searchTerms.books.results.map((book, index) => {
          return (
            <div key={book.id} className='result-container'>
              <div className='image-container'>
                <Link to={`/book/${book.slug}`} onClick={() => this.props.handleClose()}>
                  <figure className='search-result-figure'>
                    <img
                      src={book.imageUrl}
                      className='search-result-image'
                      alt={book.slug}
                    />
                  </figure>
                </Link>
              </div>
              <div className='search-result-info-container'>
                <Link to={`/book/${book.slug}`} onClick={() => this.props.handleClose()}>
                  {book.title}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/book/${book.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  {book.writtenBy}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/book/${book.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  {book.binding} {book.pages}
                </Link>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.publishers) {
        publisherResults = searchTerms.publishers.map((publisher, index) => {
          return (
            <div key={publisher.id} className='result-container'>
              <div className='image-container'>
                <a href={publisher.url}>
                  <figure className='search-result-figure'>
                    <img
                      src={publisher.image}
                      className='search-result-image'
                      alt={publisher.slug}
                    />
                  </figure>
                </a>
              </div>
              <div className='search-result-info-container'>
                <a href={publisher.url}>
                  {publisher.title}
                </a>
                <br/>
                <a className='search-type-anchor' href={publisher.url}>
                  Publisher
                </a>
              </div>
            </div>
          )
        })
      }

      return (
        <div className='search-results'>
          {readerResults ? (
            <div className='search-reader-results'>{readerResults}</div>
          ) : null}
          {authorResults ? (
            <div className='search-author-results'>{authorResults}</div>
          ) : null}
          {publisherResults ? (
            <div className='search-publisher-results'>{publisherResults}</div>
          ) : null}
          {bookResults ? (
            <div className='search-book-results'>{bookResults}</div>
          ) : null}
        </div>
      )
    }
    return (
      <div>
        {this.state.searchTerm !== '' ?
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

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props

    const selectedFilter = () => {
      if (this.state.selectedSubFilter) {
        let selectedSubFilter
        if (this.state.selectedSubFilter === 'ean') {
          selectedSubFilter = this.state.selectedSubFilter.toUpperCase()
        } else {
          selectedSubFilter = this.state.selectedSubFilter.replace(/\b\w/, (m) => {
            return m.toUpperCase()
          })
        }
        return this.state.selectedFilter + ' / ' + selectedSubFilter
      }
      return this.state.selectedFilter
    }

    return (
      <div>
        <Dialog
          bodyClassName='search-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='search-modal-container'>
            <img
              className='search-modal-logo'
              src='/image/logo.png'
            />
            <div style={styles.formContainer} onKeyPress={this.handleEnterButton}>
              <form className='form-wrapper general-font'>
                <div className='search-input-container'>
                  <div className='search-main-search-filters'>
                    <div className='filter-inside-input'>
                      <a
                        onClick={this.handleFilter}
                      >
                        {selectedFilter()}
                      </a>
                    </div>
                    {
                      this.state.isFilterOpen ?
                      (
                        <ul className='search-main-search-filters-container'>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Select Filter')}
                            >
                              -----
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Book')}
                            >
                              Book
                            </a>
                            <ul className='book-search-filter'>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'Title')}
                                >
                                  Title
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'EAN')}
                                >
                                  EAN
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'Author')}
                                >
                                  Author
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Reader')}
                            >
                              Reader
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Author')}
                            >
                              Author
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Publisher')}
                            >
                              Publisher
                            </a>
                          </li>
                        </ul>
                      ) : null
                    }
                  </div>
                  <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    onClick={this.closeFilterModal}
                    onChange={this.handleOnChange('searchTerm')}
                    value={this.state.searchTerm}
                    autoFocus
                  />
                </div>
              </form>
            </div>
            <div className='search-results-contianer'>
              { this.renderSearchResults() }
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search
  }
}

export default connect(mapStateToProps, { mainSearch, cleanSearchState })(SearchModal)
