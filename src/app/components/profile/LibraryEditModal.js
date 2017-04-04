import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ProfilePage } from '../../redux/actions'
import { Dialog } from 'material-ui'
import { PageScroller } from '../common'
import PlusIcon from 'material-ui/svg-icons/content/add-circle-outline'
import Book from './Book'
import SearchBookModal from './SearchBookModal'
import LibraryModal from './LibraryModal'
import R from 'ramda'

const {
  fetchLibrary,
  addToWishList,
  removeFromWishList,
  addToLibrary,
  removeFromLibrary,
  deleteTopBooks,
  updateTopBooks,
  setCurrentlyReading
} = ProfilePage

const styles = {

  modalBody: {
    marginTop: -80,
    paddingTop: 0,
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },

}

class LibraryEditModal extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      tabOneOpen: true,
      tabTwoOpen: false,
      tabThreeOpen: false,
      userId: '',
      searchBooksModal: false,
      searchBooksModalContext: '',
      libraryModal: false,
    }

    this.handleClickLibraryModal = this.handleClickLibraryModal.bind(this)

  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userId) {
      this.setState({
        userId: nextProps.userId
      })
    }
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params)
  })

  handleClickAddBooksModal = (context) => {
    this.setState({
      searchBooksModalContext: context,
      searchBooksModal: true,
    })
  }

  handleClickAddBooksModalClose = () => {
    this.setState({ searchBooksModal: false })
  }

  handleClickLibraryModal = (event) => {
    event.preventDefault()
    this.setState({ libraryModal: true })
  }

  handleClickLibraryModalClose = () => {
    this.setState({ libraryModal: false })
  }

  handleTabClick = (tabIndex) => {
    if (tabIndex === 1) {
      this.setState({
        tabOneOpen: true,
        tabTwoOpen: false,
        tabThreeOpen: false,
      })
    }
    if (tabIndex === 2) {
      this.setState({
        tabOneOpen: false,
        tabTwoOpen: true,
        tabThreeOpen: false,
      })
    }
    if (tabIndex === 3) {
      this.setState({
        tabOneOpen: false,
        tabTwoOpen: false,
        tabThreeOpen: true,
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

  handleAddToLibrary = (bookEan) => {
    const { userId } = this.state
    this.props.addToLibrary(bookEan, userId)
  }

  handleRemoveFromLibrary = (bookId) => {
    const { userId } = this.state
    this.props.removeFromLibrary(bookId, userId)
  }

  handleCurrentlyReading = (bookId) => {
    const { userId } = this.state
    this.props.setCurrentlyReading(bookId, userId)
  }

  handleRemoveFromWishList = (bookEan) => {
    const { userId } = this.state
    this.props.removeFromWishList(bookEan, userId)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderTabOne = () => {
    const { profilePage } = this.props
    return (
      <div className='edit-library-tab'>
        <div className='tab-heading'>
          <h4>Edit Your Library</h4>
          <a
            onClick={() => this.handleClickAddBooksModal('librarySearch')}
            className='add-book-btn'
          >
            + Add book
          </a>
        </div>
        <div className='edit-library-top-books'>
          <h5>Favorites</h5>
          {this.props.profilePage ? this.renderTopBooks() : null}
        </div>
        <div className='edit-library-library-list'>
          <PageScroller
            clsName='edit-library-library-scroller'
            fetchOnLoad={true}
            fetchHandler={this.fetchHandler(this.state.userId)}
            isLocked={profilePage.myLibrary ?
              profilePage.myLibrary.locked : false
            }
            currentPage={profilePage.myLibrary && profilePage.myLibrary.page ?
              profilePage.myLibrary.page : 0
            }
          >
            {profilePage.myLibrary && profilePage.myLibrary.results ?
              this.renderBookList(profilePage.myLibrary) : null}
          </PageScroller>
        </div>
      </div>
    )
  }

  renderEmptyBook = () => {
    return (
      <div
        onClick={this.handleClickLibraryModal}
        className='empty-book-container'
      >
        <PlusIcon />
      </div>
    )
  }

  renderTopBooks = () => {
    const { profilePage } = this.props
    if (profilePage.topBooks) {
      const topBooks = profilePage.topBooks
      return (
        <div className='top-books-modal-wrapper'>
          <div className='top-books-wrapper'>
            {topBooks.topBook1 ?
              (
                <Book
                  key={`${topBooks.topBook1.id}_1`}
                  url={topBooks.topBook1.link}
                  image={topBooks.topBook1.imageUrl}
                  id={topBooks.topBook1.id}
                  title={topBooks.topBook1.title}
                  rating={topBooks.topBook1.rating}
                  authors={topBooks.topBook1.authors}
                  bookType='topBook'
                  removeAction={() => this.handleDeleteTopBook(topBooks.topBook1.id)}
                />
              ) : this.renderEmptyBook()
            }
            {topBooks.topBook2 ?
              (
                <Book
                  key={`${topBooks.topBook2.id}_2`}
                  url={topBooks.topBook2.link}
                  image={topBooks.topBook2.imageUrl}
                  id={topBooks.topBook2.id}
                  title={topBooks.topBook2.title}
                  rating={topBooks.topBook2.rating}
                  authors={topBooks.topBook2.authors}
                  bookType='topBook'
                  removeAction={() => this.handleDeleteTopBook(topBooks.topBook2.id)}
                />
              ) : this.renderEmptyBook()
            }
            {topBooks.topBook3 ?
              (
                <Book
                  key={`${topBooks.topBook3.id}_3`}
                  url={topBooks.topBook3.link}
                  image={topBooks.topBook3.imageUrl}
                  id={topBooks.topBook3.id}
                  title={topBooks.topBook3.title}
                  rating={topBooks.topBook3.rating}
                  authors={topBooks.topBook3.authors}
                  bookType='topBook'
                  removeAction={() => this.handleDeleteTopBook(topBooks.topBook3.id)}
                />
              ) : this.renderEmptyBook()
            }
            {topBooks.topBook4 ?
              (
                <Book
                  key={`${topBooks.topBook4.id}_4`}
                  url={topBooks.topBook4.link}
                  image={topBooks.topBook4.imageUrl}
                  id={topBooks.topBook4.id}
                  title={topBooks.topBook4.title}
                  authors={topBooks.topBook4.authors}
                  rating={topBooks.topBook4.rating}
                  bookType='topBook'
                  removeAction={() => this.handleDeleteTopBook(topBooks.topBook4.id)}
                />
              ) : this.renderEmptyBook()
            }
            {topBooks.topBook5 ?
              (
                <Book
                  key={`${topBooks.topBook5.id}_5`}
                  url={topBooks.topBook5.link}
                  image={topBooks.topBook5.imageUrl}
                  id={topBooks.topBook5.id}
                  title={topBooks.topBook5.title}
                  rating={topBooks.topBook5.rating}
                  authors={topBooks.topBook5.authors}
                  bookType='topBook'
                  removeAction={() => this.handleDeleteTopBook(topBooks.topBook5.id)}
                />
              ) : this.renderEmptyBook()
            }
          </div>
        </div>
      )
    }
    return null
  }

  renderBookList = (myLibrary) => {
    const libraryPage = myLibrary.results.map((book, index) => {
      return (
        <Book
          key={`${book.id}_edit_library_${index}`}
          url={book.link}
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          authors={book.authors}
          rating={book.rating}
          bookType='libraryList'
          removeAction={() => this.handleRemoveFromLibrary(book.id)}
        />
      )
    })
    return libraryPage
  }

  renderLibraryList = (myLibrary) => {
    const libraryPage = myLibrary.results.map((book, index) => {
      return (
        <Book
          key={`${book.id}_edit_library_${index}`}
          url={book.link}
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          authors={book.authors}
          rating={book.rating}
          bookType='currentlyReading'
          addAction={() => this.handleCurrentlyReading(book.id)}
        />
      )
    })
    return libraryPage
  }

  renderTabTwo = () => {
    const { profilePage } = this.props
    if (profilePage.currentlyReading) {
      return (
        <div className='edit-library-tab'>
          <div className='tab-heading'>
            <h4>Edit Your Currently Reading Book</h4>
          </div>
          <div className='edit-library-top-books'>
            <div className='currently-reading-wrapper'>
              <Book
                url={profilePage.currentlyReading.link}
                image={profilePage.currentlyReading.imageUrl}
                id={profilePage.currentlyReading.id}
                title={profilePage.currentlyReading.title}
                authors={profilePage.currentlyReading.authors}
                rating={profilePage.currentlyReading.rating}
              />
            </div>
          </div>
          <div className='edit-library-library-list'>
            <PageScroller
              clsName='edit-library-library-scroller'
              fetchOnLoad={true}
              fetchHandler={this.fetchHandler(this.state.userId)}
              isLocked={profilePage.myLibrary ?
                profilePage.myLibrary.locked : false
              }
              currentPage={profilePage.myLibrary && profilePage.myLibrary.page ?
                profilePage.myLibrary.page : 0
              }
            >
              {profilePage.myLibrary && profilePage.myLibrary.results ?
                this.renderLibraryList(profilePage.myLibrary) : null}
            </PageScroller>
          </div>
        </div>
      )
    }
    return null
  }

  renderWishList = () => {
    const { profilePage } = this.props
    if (profilePage.wishList !== undefined) {
      const { wishList } = this.props.profilePage
      if (wishList === 'User has no books in the wish list') {
        return (
          <div>
            You don't have any book on your wish list
          </div>
        )
      }
      return wishList.map((book, index) => {
        return (
          <Book
            key={`${book.id}_edit_wish_list_${index}`}
            url={book.link}
            image={book.imageUrl}
            id={book.id}
            title={book.title}
            authors={book.authors}
            rating={book.rating}
            bookType='wishList'
            removeAction={() => this.handleRemoveFromWishList(book.id)}
          />
        )
      })
    }
    return null
  }

  renderTabThree = () => {
    return (
      <div className='edit-library-tab'>
        <div className='tab-heading'>
          <h4>Edit Your Wish List</h4>
          <a
            onClick={() => this.handleClickAddBooksModal('wishListSearch')}
            className='add-book-btn'
          >
            + Add book
          </a>
        </div>
        <div className='edit-library-top-books'>
          <h5>Your Wish List</h5>
        </div>
        <div className='edit-library-library-list'>
          <div className='edit-wishlist-container'>
            {this.renderWishList()}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      modalOpen,
      handleClose,
      profilePage,
    } = this.props

    const { tabOneOpen, tabTwoOpen, tabThreeOpen } = this.state

    return (
      <div className='library-edit-modal'>
        <Dialog
          bodyClassName='modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <section className='edit-library-section'>
            <section className='edit-library-header'>
              <div className='edit-library-go-back'>
                <a onClick={handleClose}>
                  Go Back to profile
                </a>
              </div>
              <div className='edit-library-tab-elements'>
                <div className='edit-library-single-tab'>
                  <a
                    onClick={() => this.handleTabClick(1)}
                    className={tabOneOpen ? 'library-tab-active' : null}
                  >
                    Library
                  </a>
                </div>
                <div className='edit-library-single-tab'>
                  <a
                    onClick={() => this.handleTabClick(2)}
                    className={tabTwoOpen ? 'library-tab-active' : null}
                  >
                    Currently Reading
                  </a>
                </div>
                <div className='edit-library-single-tab'>
                  <a
                    onClick={() => this.handleTabClick(3)}
                    className={tabThreeOpen ? 'library-tab-active' : null}
                  >
                    Wish List
                  </a>
                </div>
              </div>
            </section>
            <section className='edit-library-tabs-container'>
              <div className='row'>
                <div className='small-12 large-8 large-offset-2 columns'>
                  {tabOneOpen ? this.renderTabOne() : null}
                  {tabTwoOpen ? this.renderTabTwo() : null}
                  {tabThreeOpen ? this.renderTabThree() : null}
                </div>
              </div>
            </section>
          </section>
          <SearchBookModal
            modalOpen={this.state.searchBooksModal}
            handleClose={this.handleClickAddBooksModalClose}
            userId={this.state.userId}
            context={this.state.searchBooksModalContext}
          />
          <LibraryModal
            modalOpen={this.state.libraryModal}
            handleClose={this.handleClickLibraryModalClose}
            userId={this.state.userId}
            myLibrary={profilePage ? profilePage.myLibrary : null}
          />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentReader, profilePage }) => {
  return {
    currentReader: {
      shippingAddress: currentReader.shippingAddress,
    },
    profilePage: {
      currentlyReading: profilePage.currentlyReading,
      myLibrary: profilePage.library,
      topBooks: profilePage.topBooks,
      wishList: profilePage.wishList,
    }
  }
}

const mapDistpachToProps = {
  fetchLibrary,
  addToWishList,
  removeFromWishList,
  addToLibrary,
  removeFromLibrary,
  deleteTopBooks,
  updateTopBooks,
  setCurrentlyReading,
}

export default connect(mapStateToProps, mapDistpachToProps)(LibraryEditModal)
