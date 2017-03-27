import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { Search } from '../../redux/actions'
import { ProfilePage } from '../../redux/actions'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../constants/style'
import { debounce } from 'lodash'
import R from 'ramda'

const { bookSearch, updateBookSearch } = Search
const { addToLibrary, removeFromLibrary } = ProfilePage

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '80%',
    height: '100vh',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class EditLibraryModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      myLibrary: '',
      userId: '',
      shouldSpin: '',
    }
    this.handleSeach = this.handleSeach.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.myLibrary !== nextProps.myLibrary) {
      this.setState({
        myLibrary: nextProps.myLibrary,
        userId: nextProps.userId,
      })
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
    } else {
      this.setState({
        shouldSpin: true,
      })
    }
  }, 300)

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  handleAddToLibrary = (bookEan) => {
    const { userId } = this.state
    this.props.addToLibrary(bookEan, userId)
  }

  handleRemoveFromLibrary = (bookId) => {
    const { userId } = this.state
    this.props.removeFromLibrary(bookId, userId)
  }

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms && searchTerms.count) {
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
    return null
  }

  renderCurrentLibrary = () => {
    const { myLibrary } = this.state
    return myLibrary.map((book, index) => {
      const author = book.authors.length ? book.authors[0].fullname : null
      return (
        <div className='library-book-container' key={book.id}>
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
              className='search-remove-from-library-anchor'
              onClick={() => this.handleRemoveFromLibrary(book.id)}
            >
              Remove from Library
            </a>
          </div>
        </div>
      )
    })
  }

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props
    return (
      <div>
        <Dialog
          bodyClassName='edit-library-modal'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={true}
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
          <div className='edit-library-modal-container'>
            <div className='edit-library-heading-container'>
              <h4>Edit your Personal Library</h4>
            </div>
            <form className='edit-library-form'>
              <input
                type='text'
                className='form-input edit-library-form-input'
                placeholder='Search for Book Names or Book Authors'
                onChange={this.handleSeach('searchTerm')}
                value={this.state.searchTerm}
                autoFocus
              />
            </form>
            <div className='current-library-bottom-wrapper'>
              <div className='search-results-contianer border-right-divider'>
                <div className='search-results-heading-container'>
                  <h5>
                    Search Results
                  </h5>
                  <hr/>
                </div>
                <div className='library-book-results'>
                  { this.renderSearchResults() }
                  {this.state.shouldSpin ?
                    (
                      <div>
                        <RefreshIndicator
                          size={50}
                          left={70}
                          top={0}
                          loadingColor={Colors.blue}
                          status='loading'
                          style={styles.refresh}
                        />
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <div className='current-library-container'>
                <div className='current-library-heading-container'>
                  <h5>
                    Current Library Books
                  </h5>
                  <hr/>
                </div>
                <div className='current-library-elements-container'>
                  {this.state.myLibrary ? this.renderCurrentLibrary() : null}
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
  removeFromLibrary,
}

export default connect(mapStateToProps, mapDistpachToProps)(EditLibraryModal)
