import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog, } from 'material-ui'
import R from 'ramda'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Search } from '../../redux/actions'

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
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value })
    if (e.target.value.length > 3) {
      this.props.mainSearch(e.target.value)
    }
  })

  renderSearchResults = () => {
    const searchTerms = this.props.searchResults
    if (searchTerms.counts) {

      const rResults = searchTerms.readers.map((reader, index) => {
        return (
          <div key={reader.id} className='result-container'>
            <div className='image-container'>
              <a href={reader.url}>
                <figure className='search-result-figure'>
                  <img
                    src={reader.image}
                    className='search-result-image'
                    alt={reader.slug}
                  />
                </figure>
              </a>
            </div>
            <div className='search-result-info-container'>
              <a href={reader.url}>
                {reader.firstName} {reader.lastName}
              </a>
              <br/>
              <a className='search-type-anchor' href={reader.url}>
                Personal Library
              </a>
            </div>
          </div>
        )
      })

      const aResults = searchTerms.authors.map((author, index) => {
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

      const bResults = searchTerms.books.map((book, index) => {
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
                {book.title}
              </a>
              <br/>
              <a className='search-type-anchor' href={book.url}>
                {book.writtenBy}
              </a>
              <br/>
              <a className='search-type-anchor' href={book.url}>
                {book.binding} {book.pages}
              </a>
            </div>
          </div>
        )
      })

      const pResults = searchTerms.publishers.map((publisher, index) => {
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
            {rResults ? <div className='search-reader-results'>{rResults}</div> : null}
            {aResults ? <div className='search-author-results'>{aResults}</div> : null}
            {pResults ? <div className='search-publisher-results'>{pResults}</div> : null}
          </div>
          <div className='book-results-container'>
            {bResults ? <div className='search-book-results'>{bResults}</div> : null}
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

    const {
      searchTerm,
    } = this.state

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
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='search-modal-container'>
            <img
              className='search-modal-logo'
              src='./image/logo.png'
            />
            <div style={styles.formContainer}>
              <form className='form-wrapper general-font'>
                <div className='search-input-container'>
                  <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    onChange={this.handleOnChange('searchTerm')}
                    value={searchTerm}
                  />
                </div>
              </form>
              <p className='advanced-search-pharagraph'>
                Can't find what you are looking for? Try with our
                <a href=''> Advanced Search </a>
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
