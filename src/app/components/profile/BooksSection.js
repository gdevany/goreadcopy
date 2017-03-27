import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Colors } from '../../constants/style'
import { ProfilePage } from '../../redux/actions'
import Editcon from 'material-ui/svg-icons/image/edit'
import EditLibraryModal from './EditLibraryModal'
import { PageScroller } from '../common'
import CurrentlyReadingModal from './CurrentlyReadingModal'

// import Rating from 'react-rating'

const { getCurrentlyReading, getLibrary } = ProfilePage

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
    }
    this.handleEditLibraryModal = this.handleEditLibraryModal.bind(this)
    this.handleCurrentlyModal = this.handleCurrentlyModal.bind(this)
  }

  componentWillMount = () => {
    this.setState({
      libraryFetched: false
    })
  }

  componentWillReceiveProps = (nextProps) => {

    if (nextProps.id && nextProps.id !== this.state.userId) {
      this.props.getLibrary(nextProps.id)
      this.props.getCurrentlyReading(nextProps.id)
      this.setState({
        userId: nextProps.id,
        libraryFetched: true,
        isMyProfile: nextProps.isCurrentReader,
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

  renderLibrary = () => {
    const { profilePage } = this.props
    const { isMyProfile } = this.state

    if (profilePage.myLibrary.count !== undefined) {
      const libraryPage = profilePage.myLibrary.results.library.map((book, index) => {

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
                  <span className='edit-library-text'> Edit your Library</span>
                </a>
                <EditLibraryModal
                  modalOpen={this.state.addLibraryModal}
                  handleClose={this.handleEditLibraryModalClose}
                  myLibrary={profilePage.myLibrary.results.library}
                />
              </div>
            ) : null
          }
          <div
            ref={(ref) => { this.bookContainer = ref }}
            className='library-books-main-container'
          >
            {libraryPage ? libraryPage : null}
          </div>
          <PageScroller
            scrollParent={this.bookContainer}
            //fetchHandler={}
            isLocked={false}
          />
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
                  myLibrary={profilePage.myLibrary.results.library ?
                    profilePage.myLibrary.results.library : null
                  }
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
const mapStateToProps = (state) => {
  return {
    profilePage: {
      currentlyReading: state.profilePage.currentlyReading,
      myLibrary: {
        count: state.profilePage.count,
        perPage: state.profilePage.perPage,
        page: state.profilePage.page,
        results: state.profilePage.results
      }
    }
  }
}
export default connect(mapStateToProps, { getCurrentlyReading, getLibrary })(BooksSection)
