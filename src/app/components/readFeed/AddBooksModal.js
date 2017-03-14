import React, { Component } from 'react'
import { Dialog, } from 'material-ui'
import { connect } from 'react-redux'
import { Search } from '../../redux/actions'
import R from 'ramda'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { debounce } from 'lodash'

const { mainSearch, updateSearch } = Search

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

class AddBooksModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
    this.handleSeach = this.handleSeach.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)
  }

  handleSeach = R.curry((field, e) => {
    e.persist()
    this.setState({ [field]: e.target.value })
    this.debouncedSearch(e)
  })

  debouncedSearch = debounce((event) => {
    if (event.target.value.length > 3) {
      this.props.mainSearch(event.target.value, 'book-search')
    }
  }, 300)

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms.counts) {
      const bookResults = searchTerms.books.map((book, index) => {
        return (
          <div key={book.id} className='result-container'>
            <div className='image-container'>
              <a href={book.url}>
                <figure className='search-result-figure'>
                  <img
                    src={book.image}
                    className='search-result-image'
                    alt={book.slug}
                  />
                </figure>
              </a>
            </div>
            <div className='search-result-info-container'>
              <a href={book.url}>
                {book.title} by {book.writtenBy}
              </a>
              <br/>
              <a href='' className='search-result-add-to'>Add to Library</a>
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
      <RefreshIndicator
        size={50}
        left={70}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={styles.refresh}
      />
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
          modal={true}
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
                  <h2>Search Books</h2>
                  <h4>Add them to your library and earn Litcoins</h4>
                </div>
                <div className='form-wrapper general-font small-8 collumns small-centered'>
                  <div className='row'>
                    <div className='small-12 columns'>
                      <form>
                        <input
                          type='text'
                          className='form-input'
                          placeholder='Search books'
                          onChange={this.handleSeach('searchTerm')}
                          value={this.state.searchTerm}
                        />
                      </form>
                      <div className='search-results-contianer'>
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
    searchResults: state.search
  }
}

export default connect(mapStateToProps, { mainSearch, updateSearch })(AddBooksModal)
