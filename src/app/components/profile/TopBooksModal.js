import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog } from 'material-ui'
import { ProfilePage } from '../../redux/actions'
import { PageScroller } from '../common'
import R from 'ramda'

const { deleteTopBooks, updateTopBooks, fetchLibrary } = ProfilePage

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '80%',
    height: '80vh',
  },
}

class TopBooksModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myLibrary: '',
      topBooks: '',
      userId: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.myLibrary !== nextProps.myLibrary) {
      this.setState({
        myLibrary: nextProps.myLibrary,
        userId: nextProps.userId,
      })
    }

    if (this.state.topBooks !== nextProps.topBooks) {
      this.setState({
        topBooks: nextProps.topBooks,
        userId: nextProps.userId,
      })
    }
  }

  handleDeleteTopBook = (bookId) => {
    const { userId } = this.state
    this.props.deleteTopBooks(bookId, userId)
  }

  handleUpdateTopBook = (bookId) => {
    const { userId } = this.state
    this.props.updateTopBooks(bookId, userId)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderTopBooks = () => {
    const { topBooks } = this.state
    return (
      <div className='top-books-modal-wrapper'>
        <div className='top-books-wrapper'>
          {topBooks.topBook1 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook1.id}_1`}>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook1.link || topBooks.topBook1.slug}>
                    <img className='book' src={topBooks.topBook1.imageUrl} />
                  </a>
                </div>
                <div className='search-add-to-library-container'>
                  <a
                    className='search-remove-from-library-anchor'
                    onClick={() => this.handleDeleteTopBook(topBooks.topBook1.id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook2 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook2.id}_2`}>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook2.link || topBooks.topBook2.slug}>
                    <img className='book' src={topBooks.topBook2.imageUrl} />
                  </a>
                </div>
                <div className='search-add-to-library-container'>
                  <a
                    className='search-remove-from-library-anchor'
                    onClick={() => this.handleDeleteTopBook(topBooks.topBook2.id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook3 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook3.id}_3`}>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook3.link || topBooks.topBook3.slug}>
                    <img className='book' src={topBooks.topBook3.imageUrl} />
                  </a>
                </div>
                <div className='search-add-to-library-container'>
                  <a
                    className='search-remove-from-library-anchor'
                    onClick={() => this.handleDeleteTopBook(topBooks.topBook3.id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook4 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook4.id}_4`}>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook4.link || topBooks.topBook4.slug}>
                    <img className='book' src={topBooks.topBook4.imageUrl} />
                  </a>
                </div>
                <div className='search-add-to-library-container'>
                  <a
                    className='search-remove-from-library-anchor'
                    onClick={() => this.handleDeleteTopBook(topBooks.topBook4.id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook5 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook5.id}_5`}>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook5.link || topBooks.topBook5.slug}>
                    <img className='book' src={topBooks.topBook5.imageUrl} />
                  </a>
                </div>
                <div className='search-add-to-library-container'>
                  <a
                    className='search-remove-from-library-anchor'
                    onClick={() => this.handleDeleteTopBook(topBooks.topBook5.id)}
                  >
                    Remove
                  </a>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }

  renderCurrentLibrary = () => {
    const { myLibrary } = this.state
    return myLibrary.results.map((book, index) => {
      const author = book.authors.length ? book.authors[0].fullname : null
      return (
        <div className='library-book-container' key={book.id}>
          <div
            className='book-container'
          >
            <a
              onClick={() => this.handleUpdateTopBook(book.id)}
            >
              <img className='book' src={book.imageUrl} />
            </a>
          </div>
          <div className='library-book-details-container'>
            <a
              onClick={() => this.handleUpdateTopBook(book.id)}
              className='library-book-details-anchor'
            >
              <span className='link'>
                {book.title ? this.truncInfo(book.title, 30) : null}
              </span>
              <p className='link subheader library-book-details-element'>
                by: { author ? this.truncInfo(author, 15) : <i> unknown </i>}
              </p>
            </a>
          </div>
        </div>
      )
    })
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params)
  })

  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props
    const { userId, myLibrary } = this.state

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
            <div className='current-library-bottom-wrapper top-books-bottom-wrapper'>
              <div className='current-library-container top-books-container'>
                <div className='current-library-heading-container'>
                  <h5>
                    Your Top Books
                  </h5>
                  <hr/>
                </div>
                <div className='current-library-elements-container top-books-elements-container'>
                  {this.state.topBooks ? this.renderTopBooks() : null}
                </div>
              </div>
              <div className='current-library-container top-books-container'>
                <div className='current-library-heading-container'>
                  <h5>
                    Click on any Book to Set it as Top Book
                  </h5>
                  <hr/>
                </div>
                <div
                  ref={(ref)=>{this.libraryContainer = ref}}
                  className='current-library-elements-container top-books-library-elements'
                >
                  {
                    myLibrary ? this.renderCurrentLibrary() : null
                  }
                  {
                    myLibrary ? (
                      <PageScroller
                        fetchOnLoad={false}
                        scrollParent={this.libraryContainer}
                        fetchHandler={this.fetchHandler(userId)}
                        isLocked={myLibrary ? myLibrary.locked : false}
                        currentPage={myLibrary && myLibrary.page ? myLibrary.page : 0}
                      />
                    ) : null
                  }
                </div>

              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { deleteTopBooks, updateTopBooks, fetchLibrary })(TopBooksModal)
