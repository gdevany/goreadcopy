import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Dialog, } from 'material-ui'
import R from 'ramda'
import { ExternalRoutes as routes } from '../../constants'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Search } from '../../redux/actions'
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

class SearchModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.debouncedSearch = this.debouncedSearch.bind(this)

  }

  handleOnChange = R.curry((field, e) => {
    e.persist()
    this.setState({ [field]: e.target.value })
    this.debouncedSearch(e)
  })

  debouncedSearch = debounce((event) => {
    if (event.target.value.length > 3) {
      this.props.mainSearch(event.target.value, 'main-search')
    }
  }, 300)

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms.counts) {
      const readerResults = searchTerms.readers.map((reader, index) => {
        return (
          <div key={reader.id} className='result-container'>
            <div className='image-container'>
              <Link to={`profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
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
              <Link to={`profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
                {reader.firstName} {reader.lastName}
              </Link>
              <br/>
              <Link
                className='search-type-anchor'
                to={`profile/${reader.slug}`}
                onClick={() => this.props.handleClose()}
              >
                Personal Library
              </Link>
            </div>
          </div>
        )
      })

      const authorResults = searchTerms.authors.map((author, index) => {
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

      const bookResults = searchTerms.books.map((book, index) => {
        return (
          <div key={book.id} className='result-container'>
            <div className='image-container'>
              <Link to={`/book/${book.slug}`}>
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
              <Link to={`/book/${book.slug}`}>
                {book.title}
              </Link>
              <br/>
              <Link className='search-type-anchor' to={`/book/${book.slug}`}>
                {book.writtenBy}
              </Link>
              <br/>
              <Link className='search-type-anchor' to={`/book/${book.slug}`}>
                {book.binding} {book.pages}
              </Link>
            </div>
          </div>
        )
      })

      const publisherResults = searchTerms.publishers.map((publisher, index) => {
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

      return (
        <div className='search-results'>
          <div className='rap-results-container'>
            {readerResults ? (
              <div className='search-reader-results'>{readerResults}</div>
            ) : null}
            {authorResults ? (
              <div className='search-author-results'>{authorResults}</div>
            ) : null}
            {publisherResults ? (
              <div className='search-publisher-results'>{publisherResults}</div>
            ) : null}
          </div>
          <div className='book-results-container'>
            {bookResults ? (
              <div className='search-book-results'>{bookResults}</div>
            ) : null}
          </div>
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

    const {
      searchTerm,
    } = this.state

    const {
      advancedSearch,
    } = routes
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
                  <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    onChange={this.handleOnChange('searchTerm')}
                    value={searchTerm}
                    autoFocus
                  />
                </div>
              </form>
              <p className='advanced-search-pharagraph'>
                Can't find what you are looking for? Try with our
                <a href={advancedSearch()}> Advanced Search </a>
              </p>
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

export default connect(mapStateToProps, { mainSearch, updateSearch })(SearchModal)
