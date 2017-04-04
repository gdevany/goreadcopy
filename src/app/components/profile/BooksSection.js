import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Colors } from '../../constants/style'
import { ProfilePage } from '../../redux/actions'
import { PageScroller } from '../common'
import Editcon from 'material-ui/svg-icons/image/edit'
import StarIcon from 'material-ui/svg-icons/toggle/star'
import LibraryEditModal from './LibraryEditModal'
import R from 'ramda'
import Rating from 'react-rating'

const { getProfileBookInfo, fetchLibrary } = ProfilePage

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  tab: {
    backgroundColor: Colors.white,
    color: Colors.black,
    borderBottom: `1px solid ${Colors.lightMedGrey}`,
    fontSize: 12,
    fontWeight: 200,
    textTransform: 'none',
  },
  tabContainer: {
    width: '100%',
    maxWidth: 800,
    margin: '0px auto',
  },
  currentTab: {
    color: Colors.blue,
    borderBottom: `2px solid ${Colors.blue}`,
  },
}

class BooksSection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      libraryFetched: false,
      userId: null,
      isMyProfile: false,
      addLibraryModal: false,
    }
    this.handleEditLibraryModal = this.handleEditLibraryModal.bind(this)
  }

  componentWillMount = () => {
    this.setState({
      libraryFetched: false
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.id && nextProps.id !== this.state.userId) {
      this.props.getProfileBookInfo(nextProps.id)
      this.setState({
        userId: nextProps.id,
        libraryFetched: true,
        isMyProfile: nextProps.isCurrentReader,
      })
    }
    if (nextProps.isCurrentReader) {
      this.setState({
        isMyProfile: nextProps.isCurrentReader
      })
    }
  }

  handleEditLibraryModal = (event) => {
    event.preventDefault()
    this.setState({ addLibraryModal: true })
  }

  handleEditLibraryModalClose = () => {
    this.setState({ addLibraryModal: false })
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon library-rating-icon' src='/image/star.svg' />}
        empty={<img className='rating-icon library-rating-icon' src='/image/star-empty.svg' />}
      />
    )
  }

  renderTopBooks = () => {
    const { profilePage } = this.props
    if (profilePage.topBooks !== undefined) {
      const { topBooks } = this.props.profilePage
      return (
        <div className='top-books-wrapper'>
          {topBooks.topBook1 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook1.id}_1`}>
                <div className='favorite-badge'>
                  <StarIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook1.link || topBooks.topBook1.slug}>
                    <img className='book' src={topBooks.topBook1.imageUrl} />
                  </a>
                  <span className='rating' >
                    {this.renderRating(Math.round(topBooks.topBook1.rating.average))}
                  </span>
                  <div className='book-info-container'>
                    <span className='book-info-title'>
                      {this.truncInfo(topBooks.topBook1.title, 15)}
                    </span>
                    <span className='book-info-author'>
                      {topBooks.topBook1.authors[0] ?
                        (
                          `by ${topBooks.topBook1.authors[0].fullname}`
                        ) : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook2 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook2.id}_2`}>
                <div className='favorite-badge'>
                  <StarIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook2.link || topBooks.topBook2.slug}>
                    <img className='book' src={topBooks.topBook2.imageUrl} />
                  </a>
                  <span className='rating' >
                    {this.renderRating(Math.round(topBooks.topBook2.rating.average))}
                  </span>
                  <div className='book-info-container'>
                    <span className='book-info-title'>
                      {this.truncInfo(topBooks.topBook2.title, 15)}
                    </span>
                    <span className='book-info-author'>
                      {topBooks.topBook2.authors[0] ?
                        (
                          `by ${topBooks.topBook2.authors[0].fullname}`
                        ) : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook3 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook3.id}_3`}>
                <div className='favorite-badge'>
                  <StarIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook3.link || topBooks.topBook3.slug}>
                    <img className='book' src={topBooks.topBook3.imageUrl} />
                  </a>
                  <span className='rating' >
                    {this.renderRating(Math.round(topBooks.topBook3.rating.average))}
                  </span>
                  <div className='book-info-container'>
                    <span className='book-info-title'>
                      {this.truncInfo(topBooks.topBook3.title, 15)}
                    </span>
                    <span className='book-info-author'>
                      {topBooks.topBook3.authors[0] ?
                        (
                          `by ${topBooks.topBook3.authors[0].fullname}`
                        ) : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook4 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook4.id}_4`}>
                <div className='favorite-badge'>
                  <StarIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook4.link || topBooks.topBook4.slug}>
                    <img className='book' src={topBooks.topBook4.imageUrl} />
                  </a>
                  <span className='rating' >
                    {this.renderRating(Math.round(topBooks.topBook4.rating.average))}
                  </span>
                  <div className='book-info-container'>
                    <span className='book-info-title'>
                      {this.truncInfo(topBooks.topBook4.title, 15)}
                    </span>
                    <span className='book-info-author'>
                      {topBooks.topBook4.authors[0] ?
                        (
                          `by ${topBooks.topBook4.authors[0].fullname}`
                        ) : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook5 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook5.id}_5`}>
                <div className='favorite-badge'>
                  <StarIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook5.link || topBooks.topBook5.slug}>
                    <img className='book' src={topBooks.topBook5.imageUrl} />
                  </a>
                  <span className='rating' >
                    {this.renderRating(Math.round(topBooks.topBook5.rating.average))}
                  </span>
                  <div className='book-info-container'>
                    <span className='book-info-title'>
                      {this.truncInfo(topBooks.topBook5.title, 15)}
                    </span>
                    <span className='book-info-author'>
                      {topBooks.topBook5.authors[0] ?
                        (
                          `by ${topBooks.topBook5.authors[0].fullname}`
                        ) : null
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : null
          }
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
            User has no books in the wish list
          </div>
        )
      }
      return wishList.map((book, index) => {
        const author = book.authors.length ? book.authors[0].fullname : null
        return (
          <div className='wishlist-book-container' key={book.id}>
            <div
              className='book-container'
            >
              <a href={this.state.isMyProfile ? book.link : book.wishListUrl}>
                <img className='book' src={book.imageUrl} />
              </a>
              <span className='rating'>
                {this.renderRating(Math.round(book.rating.average))}
              </span>
              <div className='book-info-container'>
                <span className='book-info-title'>
                  {book.title ? this.truncInfo(book.title, 15) : <i> unknown </i>}
                </span>
                <span className='book-info-author'>
                  {book.authors[0] ?
                    (
                      `by ${author}`
                    ) : <i> unknown </i>
                  }
                </span>
              </div>
            </div>
          </div>
        )
      })
    }
    return null
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params)
  })

  renderBookList = (myLibrary) => {
    const libraryPage = myLibrary.results.map((book, index) => {
      const author = book.authors.length ? book.authors[0].fullname : null
      return (
        <div className='library-book-container' key={`${book.id}_bookSection${index}`}>
          <div
            className='book-container'
          >
            <a href={book.link || book.slug}>
              <img className='book' src={book.imageUrl} />
            </a>
            <span className='rating'>
              {this.renderRating(Math.round(book.rating.average))}
            </span>
            <div className='book-info-container'>
              <span className='book-info-title'>
                {book.title ? this.truncInfo(book.title, 15) : <i> unknown </i>}
              </span>
              <span className='book-info-author'>
                {book.authors[0] ?
                  (
                    `by ${author}`
                  ) : <i> unknown </i>
                }
              </span>
            </div>
          </div>
        </div>
      )
    })
    return libraryPage
  }

  renderLibrary = () => {
    const { profilePage: { myLibrary } } = this.props
    const { isMyProfile, userId } = this.state
    return (
      <div>
        {isMyProfile && userId ?
          (
            <div className='library-edit-heading'>
              <a
                className='edit-library-anchor'
                onClick={this.handleEditLibraryModal}
              >
                <Editcon/>
                <span className='edit-library-text'>Add Books</span>
              </a>
              <LibraryEditModal
                modalOpen={this.state.addLibraryModal}
                handleClose={this.handleEditLibraryModalClose}
                userId={userId}
              />
            </div>
          ) : null
        }
        <PageScroller
          clsName='library-books-main-container'
          fetchOnLoad={true}
          fetchHandler={this.fetchHandler(userId)}
          isLocked={myLibrary ? myLibrary.locked : false}
          currentPage={myLibrary && myLibrary.page ? myLibrary.page : 0}
        >
          {this.renderTopBooks() !== null ? this.renderTopBooks() : null}
          {myLibrary && myLibrary.results ? this.renderBookList(myLibrary) : null}
        </PageScroller>
      </div>
    )
  }

  renderCurrentlyReading = () => {
    const { profilePage } = this.props

    if (profilePage.currentlyReading) {
      return (
        <div>
          {profilePage.currentlyReading.link === '' ?
            (
              <div className='not-currently-reading'>
                Not Currently Reading a Book
              </div>
            ) : (
              <div className='currently-reading-book'>
                <div
                  className='book-container'
                >
                  <a href={profilePage.currentlyReading.link ||
                    profilePage.currentlyReading.slug}
                  >
                    <img className='book' src={profilePage.currentlyReading.imageUrl} />
                  </a>
                </div>
              </div>
            )
          }
        </div>
      )
    }
    return null
  }

  render() {
    const { userId, libraryFetched } = this.state

    if (userId && libraryFetched) {
      return (
        <div className='sidebar-books-container box'>
          <Tabs
            style={styles.tabContainer}
            inkBarStyle={styles.currentTab}
          >
            <Tab
              label='Library'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                {this.renderLibrary()}
              </div>
            </Tab>
            <Tab
              label='Currently Reading'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                {this.renderCurrentlyReading()}
              </div>
            </Tab>
            <Tab
              label='Wish List'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                <div className='wishlist-container'>
                  {this.renderWishList()}
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    }
    return null
  }
}
const mapStateToProps = ({ currentReader, profilePage }) => {
  return {
    profilePage: {
      currentlyReading: profilePage.currentlyReading,
      myLibrary: profilePage.library,
      topBooks: profilePage.topBooks,
      wishList: profilePage.wishList,
    }
  }
}

const mapDistpachToProps = {
  getProfileBookInfo,
  fetchLibrary,
}

export default connect(mapStateToProps, mapDistpachToProps)(BooksSection)
