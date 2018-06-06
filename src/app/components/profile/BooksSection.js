import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import Editcon from 'material-ui/svg-icons/image/edit';
import R from 'ramda';
import Rating from 'react-rating';
import { Colors } from '../../constants/style';
import { ProfilePage } from '../../redux/actions';
import { PageScroller } from '../common';
import LibraryEditModal from './LibraryEditModal';
import Book from './Book';

const { getProfileBookInfo, fetchLibrary } = ProfilePage;

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
};

class BooksSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      libraryFetched: false,
      userId: null,
      isMyProfile: false,
      addLibraryModal: false,
    };
    this.handleEditLibraryModal = this.handleEditLibraryModal.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentWillMount = () => {
    const { router } = this.context;
    if (router && router.location.query && router.location.query.action === 'library') {
      this.setState({ addLibraryModal: true });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.id && nextProps.id !== this.state.userId) {
      this.props.getProfileBookInfo(nextProps.id);
      this.setState({
        userId: nextProps.id,
        libraryFetched: true,
        isMyProfile: nextProps.isCurrentReader,
      });
    }
    if (nextProps.isCurrentReader) {
      this.setState({
        isMyProfile: nextProps.isCurrentReader,
      });
    }
  }

  handleEditLibraryModal = (event) => {
    event.preventDefault();
    this.setState({ addLibraryModal: true });
  }

  handleEditLibraryModalClose = () => {
    this.setState({ addLibraryModal: false });
  }

  renderTopBooks = () => {
    const { profilePage } = this.props;
    if (profilePage.topBooks !== undefined) {
      const { topBooks } = this.props.profilePage;
      return (
        <div className="top-books-wrapper">
          {topBooks.topBook1 ?
            (
              <Book
                key={`${topBooks.topBook1.id}_1`}
                image={topBooks.topBook1.imageUrl}
                id={topBooks.topBook1.id}
                title={topBooks.topBook1.title}
                slug={topBooks.topBook1.slug}
                rating={topBooks.topBook1.rating}
                authors={topBooks.topBook1.authors}
                bookType="topBookProfile"
              />
            ) : null
          }
          {topBooks.topBook2 ?
            (
              <Book
                key={`${topBooks.topBook2.id}_2`}
                image={topBooks.topBook2.imageUrl}
                id={topBooks.topBook2.id}
                title={topBooks.topBook2.title}
                slug={topBooks.topBook2.slug}
                rating={topBooks.topBook2.rating}
                authors={topBooks.topBook2.authors}
                bookType="topBookProfile"
              />
            ) : null
          }
          {topBooks.topBook3 ?
            (
              <Book
                key={`${topBooks.topBook3.id}_3`}
                image={topBooks.topBook3.imageUrl}
                id={topBooks.topBook3.id}
                title={topBooks.topBook3.title}
                slug={topBooks.topBook3.slug}
                rating={topBooks.topBook3.rating}
                authors={topBooks.topBook3.authors}
                bookType="topBookProfile"
              />
            ) : null
          }
          {topBooks.topBook4 ?
            (
              <Book
                key={`${topBooks.topBook4.id}_4`}
                image={topBooks.topBook4.imageUrl}
                id={topBooks.topBook4.id}
                title={topBooks.topBook4.title}
                slug={topBooks.topBook4.slug}
                authors={topBooks.topBook4.authors}
                rating={topBooks.topBook4.rating}
                bookType="topBookProfile"
              />
            ) : null
          }
          {topBooks.topBook5 ?
            (
              <Book
                key={`${topBooks.topBook5.id}_5`}
                image={topBooks.topBook5.imageUrl}
                id={topBooks.topBook5.id}
                title={topBooks.topBook5.title}
                slug={topBooks.topBook5.slug}
                rating={topBooks.topBook5.rating}
                authors={topBooks.topBook5.authors}
                bookType="topBookProfile"
              />
            ) : null
          }
        </div>
      );
    }
    return null;
  }

  renderWishList = () => {
    const { profilePage } = this.props;
    if (profilePage.wishList !== undefined) {
      const { wishList } = this.props.profilePage;
      if (wishList === 'User has no books in the wish list') {
        return (
          <div>
            User has no books in the wish list
          </div>
        );
      }
      return wishList.map(book => (
        <div className="wishlist-book-container" key={book.id}>
          <Book
            image={book.imageUrl}
            id={book.id}
            title={book.title}
            slug={book.slug}
            authors={book.authors}
            rating={book.rating}
          />
        </div>
      ));
    }
    return null;
  }

  fetchHandler = R.curry((id, params) => {
    this.props.fetchLibrary(id, params);
  })

  renderRating = rating => (
    <Rating
      readonly
      initialRate={rating}
      full={<img className="rating-icon library-rating-icon" src="/image/star.svg" alt="" />}
      empty={<img className="rating-icon library-rating-icon" src="/image/star-empty.svg" alt="" />}
    />
  );

  renderBookList = (myLibrary) => {
    const libraryPage = myLibrary.results.map((book, index) => (
      <div className="library-book-container" key={`${book.id}_bookSection${index}`}>
        <Book
          image={book.imageUrl}
          id={book.id}
          title={book.title}
          slug={book.slug}
          authors={book.authors}
          rating={book.rating}
        />
      </div>
    ));
    return libraryPage;
  }

  renderLibrary = () => {
    const { profilePage: { myLibrary } } = this.props;
    const { isMyProfile, userId } = this.state;
    return (
      <div>
        {isMyProfile && userId ?
          (
            <div className="library-edit-heading">
              <a
                className="edit-library-anchor"
                onClick={this.handleEditLibraryModal}
              >
                <Editcon />
                <span className="edit-library-text">Add Books</span>
              </a>
            </div>
          ) : null
        }
        <PageScroller
          clsName="library-books-main-container"
          fetchOnLoad
          fetchHandler={this.fetchHandler(userId)}
          isLocked={myLibrary ? myLibrary.locked : false}
          currentPage={myLibrary && myLibrary.page ? myLibrary.page : 0}
        >
          {this.renderTopBooks() !== null ? this.renderTopBooks() : null}
          {myLibrary && myLibrary.results ?
            this.renderBookList(myLibrary) : <div className="loading-animation" />
          }
        </PageScroller>
      </div>
    );
  }

  renderCurrentlyReading = () => {
    const { profilePage } = this.props;
    const { isMyProfile, userId } = this.state;

    if (profilePage.currentlyReading) {
      return (
        <div>
          {isMyProfile && userId ?
            (
              <div className="library-edit-heading">
                <a
                  className="edit-library-anchor"
                  onClick={this.handleEditLibraryModal}
                >
                  <Editcon />
                  <span className="edit-library-text">Add book</span>
                </a>
              </div>
            ) : null
          }
          {profilePage.currentlyReading.link === '' ?
            (
              <div className="not-currently-reading">
                Not Currently Reading a Book
              </div>
            ) : (
              <div className="currently-reading-book">
                <Book
                  image={profilePage.currentlyReading.imageUrl}
                  id={profilePage.currentlyReading.id}
                  title={profilePage.currentlyReading.title}
                  slug={profilePage.currentlyReading.slug}
                  authors={profilePage.currentlyReading.authors}
                  rating={profilePage.currentlyReading.rating}
                />
              </div>
            )
          }
        </div>
      );
    }
    return <div className="loading-animation" />;
  }

  render() {
    const { userId, libraryFetched, isMyProfile } = this.state;
    if (userId && libraryFetched) {
      return (
        <div className="sidebar-books-container box">
          <Tabs
            style={styles.tabContainer}
            inkBarStyle={styles.currentTab}
          >
            <Tab
              label="Library"
              style={styles.tab}
            >
              <div className="sidebar-books-tab-container">
                {this.renderLibrary()}
              </div>
            </Tab>
            <Tab
              label="Currently Reading"
              style={styles.tab}
            >
              <div className="sidebar-books-tab-container">
                {this.renderCurrentlyReading()}
              </div>
            </Tab>
            <Tab
              label="Wish List"
              style={styles.tab}
            >
              <div className="sidebar-books-tab-container">
                {isMyProfile && userId ?
                  (
                    <div className="library-edit-heading">
                      <a
                        className="edit-library-anchor"
                        onClick={this.handleEditLibraryModal}
                      >
                        <Editcon />
                        <span className="edit-library-text">Add books to Wishlist</span>
                      </a>
                    </div>
                  ) : null
                }
                <div className="wishlist-container">
                  {this.renderWishList()}
                </div>
              </div>
            </Tab>
          </Tabs>
          {
            isMyProfile && userId ?
              <LibraryEditModal
                modalOpen={this.state.addLibraryModal}
                handleClose={this.handleEditLibraryModalClose}
                userId={userId}
              /> :
              null
          }
        </div>
      );
    }
    return null;
  }
}
const mapStateToProps = ({ profilePage }) => ({
  profilePage: {
    currentlyReading: profilePage.currentlyReading,
    myLibrary: profilePage.library,
    topBooks: profilePage.topBooks,
    wishList: profilePage.wishList,
  },
});

const mapDistpachToProps = {
  getProfileBookInfo,
  fetchLibrary,
};

export default connect(mapStateToProps, mapDistpachToProps)(BooksSection);
