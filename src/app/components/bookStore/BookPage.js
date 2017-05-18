import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BookStoreNavBar } from '../common'
import WishListBooks from './WishListBooks'
import BookInfo from './BookInfo'
import MeetAuthor from './MeetAuthor'
import ReviewsOverview from './ReviewsOverview'
import ReviewsContainer from './ReviewsContainer'
import NewsLetter from './NewsLetter'
import { Footer } from '../common'
import { Auth } from '../../services'
import { Store } from '../../redux/actions'

const { getBookInfo } = Store

const isUserLoggedIn = Auth.currentUserExists()

class BookPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookInfo: null
    }
  }
  componentWillMount = () => {
    const bookSlug = this.props.params.slug
    this.props.getBookInfo(bookSlug)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bookInfo) {
      this.setState({
        bookInfo: nextProps.bookInfo
      })
    }
  }

  render() {
    const { bookInfo } = this.state
    return (
      <div>
        <BookStoreNavBar/>
        <div className='bookpage-main-container'>
          {bookInfo ? <BookInfo bookInfo={bookInfo} /> : null}
          <div className='bookpage-announcement-container'>
            <div className='bookpage-announcement-details'>
              <h3>End of watch Thread</h3>
              <div className='bookpage-announcement-posts'>
                <figure className='bookpage-announcement-posts-figure'>
                  <img src='/image/commented-bookstore-icon.svg'/>
                </figure>
                <span className='bookpage-announcement-posts-text'>
                  30 Posts
                </span>
              </div>
              <div className='bookpage-announcement-anchor-container'>
                <a className='bookpage-announcement-anchor-text'>
                  Join the convo
                </a>
              </div>
            </div>
            <figure className='bookpage-announcement-figure'>
              <img src='/image/chat-illustration.png'/>
            </figure>
          </div>
          {isUserLoggedIn ? <WishListBooks/> : null}
          <hr className='bookpage-hr-separator'/>
          <MeetAuthor
            profilePic='/image/kendunn.jpg'
            description={`
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            `}
            followers={12843}
            books={43}
            fullname='Stephen King'
            url='https://www.goread.com/author/kendunn'
          />
          <hr className='bookpage-hr-separator'/>
          <ReviewsOverview
            reviewsInfo={{
              total: 4.8,
              goodreads: {
                total: 4.3,
              },
              amazon: {
                total: 3.8,
              }
            }}
          />
          <hr className='bookpage-hr-separator'/>
          <ReviewsContainer isLogged={isUserLoggedIn} />
          <hr className='bookpage-hr-separator'/>
          {isUserLoggedIn ? null : <NewsLetter />}
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    bookInfo: state.store.bookInfo,
  }
}

export default connect(mapStateToProps, { getBookInfo })(BookPage)
