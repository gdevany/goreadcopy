import React, { Component } from 'react'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { Search, ProfilePage } from '../../redux/actions'
import { debounce } from 'lodash'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'
import R from 'ramda'

const { bookSearch, updateBookSearch } = Search
const { addToLibrary } = ProfilePage
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

class AddBooksModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      userId: '',
    }
    this.handleSeach = this.handleSeach.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.userId !== nextProps.userId) {
      this.setState({
        userId: nextProps.userId,
      })
    }
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  handleAddToLibrary = (bookEan) => {
    const { userId } = this.state
    this.props.addToLibrary(bookEan, userId, 'readfeed')
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  handleSeach = R.curry((field, e) => {
    e.persist()
    this.setState({ [field]: e.target.value })
    this.debouncedSearch(e)
  })

  debouncedSearch = debounce((event) => {
    if (event.target.value.length > 3) {
      this.props.bookSearch(event.target.value)
    }
  }, 300)

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms) {
      const bookResults = searchTerms.results.map((book, index) => {
        const author = book.authors[0] ? book.authors[0].fullname : null
        return (
          <div key={`${book.ean}_${index}`} className='result-container'>
            <div
              className='book-container'
            >
              <a href={book.link || book.slug}>
                <img className='book' src={book.imageUrl} />
              </a>
            </div>
            <div className='library-book-details-container'>
              <a href={book.slug} className='library-book-details-anchor'>
                <span className='link'>
                  {book.title ? this.truncInfo(book.title, 30) : null}
                </span>
                <p className='link subheader library-book-details-element'>
                  by: { author ? this.truncInfo(author, 15) : <i> unknown </i>}
                </p>
              </a>
            </div>
            <div className='search-add-to-library-container'>
              <a
                className='search-add-to-library-anchor'
                onClick={() => this.handleAddToLibrary(book.ean)}
              >
                Add to Library
              </a>
            </div>
          </div>
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
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='complete-profile-modal-container row'>
            <div className='small-12 columns'>
              <div className='row'>
                <div className='center-text small-8 collumns small-centered'>
                  <h2 className='searchbooks-readfeeed-title'>Search Books</h2>
                  <h4 className='searchbooks-readfeeed-subtitle'>
                    Add them to your library and earn Litcoins
                  </h4>
                </div>
                <div className='form-wrapper general-font small-10 collumns small-centered'>
                  <div className='row'>
                    <div className='small-12 columns search-books-on-readfeed'>
                      <form onKeyPress={this.handleEnterButton} className='search-books-form'>
                        <input
                          type='text'
                          className='form-input'
                          placeholder='Search books'
                          onChange={this.handleSeach('searchTerm')}
                          value={this.state.searchTerm}
                        />
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
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.bookSearch
  }
}

const mapDistpachToProps = {
  bookSearch,
  updateBookSearch,
  addToLibrary,
}

export default connect(mapStateToProps, mapDistpachToProps)(AddBooksModal)
