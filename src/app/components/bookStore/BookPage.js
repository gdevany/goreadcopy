import React, { PureComponent } from 'react'
import { BookStoreNavBar } from '../common'
import WishListBooks from './wishListBooks'
import BookInfo from './BookInfo'
import MeetAuthor from './MeetAuthor'
import ReviewsOverview from './ReviewsOverview'
import NewsLetter from './NewsLetter'
import { Footer } from '../common'
import { Auth } from '../../services'

const isUserLoggedIn = Auth.currentUserExists()

class BookPage extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar/>
        <div className='bookpage-main-container'>
          <BookInfo />
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
              total: 5,
              goodreads: {
                total: 4,
              },
              amazon: {
                total: 5,
              }
            }}
          />
          {isUserLoggedIn ? null : <NewsLetter />}
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

export default BookPage
