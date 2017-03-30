import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Colors } from '../../constants/style'
import { ProfilePage } from '../../redux/actions'
import { PageScroller } from '../common'
import Editcon from 'material-ui/svg-icons/image/edit'
import StartIcon from 'material-ui/svg-icons/toggle/star'
import EditLibraryModal from './EditLibraryModal'
import CurrentlyReadingModal from './CurrentlyReadingModal'
import TopBooksModal from './TopBooksModal'
import R from 'ramda'

// import Rating from 'react-rating'

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
      addCurrentlyModal: false,
      topBooksModal: false,
    }
    this.handleEditLibraryModal = this.handleEditLibraryModal.bind(this)
    this.handleCurrentlyModal = this.handleCurrentlyModal.bind(this)
    this.handleTopBooksModal = this.handleTopBooksModal.bind(this)
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

  handleCurrentlyModal = (event) => {
    event.preventDefault()
    this.setState({ addCurrentlyModal: true })
  }

  handleCurrentlyModalClose = () => {
    this.setState({ addCurrentlyModal: false })
  }

  handleTopBooksModal = (event) => {
    event.preventDefault()
    this.setState({ topBooksModal: true })
  }

  handleTopBooksModalClose = () => {
    this.setState({ topBooksModal: false })
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }
  // TODO: Uncomment when we implement Ratings

  // renderRating = (rating) => {
  //   return (
  //     <Rating
  //       readonly={true}
  //       initialRate={rating}
  //       full={<img className='rating-icon library-rating-icon' src='/image/star.svg' />}
  //       empty={<img className='rating-icon library-rating-icon' src='/image/star-empty.svg' />}
  //     />
  //   )
  // }

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
                  <StartIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook1.link || topBooks.topBook1.slug}>
                    <img className='book' src={topBooks.topBook1.imageUrl} />
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook2 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook2.id}_2`}>
                <div className='favorite-badge'>
                  <StartIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook2.link || topBooks.topBook2.slug}>
                    <img className='book' src={topBooks.topBook2.imageUrl} />
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook3 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook3.id}_3`}>
                <div className='favorite-badge'>
                  <StartIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook3.link || topBooks.topBook3.slug}>
                    <img className='book' src={topBooks.topBook3.imageUrl} />
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook4 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook4.id}_4`}>
                <div className='favorite-badge'>
                  <StartIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook4.link || topBooks.topBook4.slug}>
                    <img className='book' src={topBooks.topBook4.imageUrl} />
                  </a>
                </div>
              </div>
            ) : null
          }
          {topBooks.topBook5 ?
            (
              <div className='library-book-container' key={`${topBooks.topBook5.id}_5`}>
                <div className='favorite-badge'>
                  <StartIcon/>
                </div>
                <div
                  className='book-container'
                >
                  <a href={topBooks.topBook5.link || topBooks.topBook5.slug}>
                    <img className='book' src={topBooks.topBook5.imageUrl} />
                  </a>
                </div>
              </div>
            ) : null
          }
        </div>
      )
    }
    return null
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params)
  })

  renderLibrary = () => {
    const { profilePage } = this.props
    const { isMyProfile } = this.state

    if (profilePage.myLibrary && profilePage.myLibrary.results) {

      const libraryPage = profilePage.myLibrary.results.map((book, index) => {

        const author = book.authors.length ? book.authors[0].fullname : null

        return (
          <div className='library-book-container' key={`${book.id}`}>
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
                {/* <span className='rating' >
                  {this.renderRating(Math.round(book.rating.average))}
                </span> */}
              </a>
            </div>
          </div>
        )
      })

      return (
        <div>
          {isMyProfile ?
            (
              <div className='library-edit-heading'>
                <a
                  className='edit-library-anchor'
                  onClick={this.handleEditLibraryModal}
                >
                  <Editcon/>
                  <span className='edit-library-text'> Edit Library</span>
                </a>
                <EditLibraryModal
                  modalOpen={this.state.addLibraryModal}
                  handleClose={this.handleEditLibraryModalClose}
                  myLibrary={profilePage.myLibrary.results}
                  userId={this.state.userId}
                />
                <a
                  className='edit-library-anchor'
                  onClick={this.handleTopBooksModal}
                >
                  <Editcon/>
                  <span className='edit-library-text'>Top Books</span>
                </a>
                <TopBooksModal
                  modalOpen={this.state.topBooksModal}
                  handleClose={this.handleTopBooksModalClose}
                  myLibrary={profilePage.myLibrary.results}
                  topBooks={profilePage.topBooks}
                  userId={this.state.userId}
                />
              </div>
            ) : null
          }
          <div
            ref={(ref) => { this.bookContainer = ref }}
            className='library-books-main-container'
          >
            {this.renderTopBooks() !== null ? this.renderTopBooks() : null}
            {libraryPage ? libraryPage : null}
          </div>
        </div>
      )
    }
    return null
  }

  renderCurrentlyReading = () => {
    const { profilePage } = this.props
    const { isMyProfile } = this.state

    if (profilePage.currentlyReading) {
      return (
        <div>
          {isMyProfile ?
            (
              <div className='library-edit-heading'>
                <a
                  className='edit-library-anchor'
                  onClick={this.handleCurrentlyModal}
                >
                  <Editcon/>
                  <span className='edit-library-text'> Add a Favorite Book</span>
                </a>
                <CurrentlyReadingModal
                  modalOpen={this.state.addCurrentlyModal}
                  handleClose={this.handleCurrentlyModalClose}
                  myLibrary={profilePage.myLibrary.results ?
                    profilePage.myLibrary.results : null
                  }
                  userId={this.state.userId}
                />
              </div>
            ) : null
          }
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
    const { profilePage: { myLibrary } } = this.props

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
              <PageScroller
                scrollParent={this.bookContainer}
                fetchHandler={this.fetchHandler(userId)}
                isLocked={myLibrary ? myLibrary.locked : false}
              />
            </Tab>
            <Tab
              label='Now Reading'
              style={styles.tab}
            >
              <div className='sidebar-books-tab-container'>
                {this.renderCurrentlyReading()}
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    }
    return null
  }
}
const mapStateToProps = ({ profilePage }) => {
  return {
    profilePage: {
      currentlyReading: profilePage.currentlyReading,
      myLibrary: profilePage.library,
      topBooks: profilePage.topBooks,
    }
  }
}

const mapDistpachToProps = {
  getProfileBookInfo,
  fetchLibrary
}

export default connect(mapStateToProps, mapDistpachToProps)(BooksSection)
