import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Scroll from 'react-scroll'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import WishListBooks from '../common/wishListBooks'
import BookInfo from './BookInfo'
import MeetAuthor from './MeetAuthor'
import ReviewsOverview from './ReviewsOverview'
import ReviewsContainer from './ReviewsContainer'
import NewsLetter from './NewsLetter'
import { Auth } from '../../../services'
import { Store, Rates } from '../../../redux/actions'

const { getBookInfo } = Store
const { getStarsInfo } = Rates
const Anchor = Scroll.Link
const { Element } = Scroll

const isUserLoggedIn = Auth.currentUserExists()

class BookPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookInfo: null,
      starsInfo: null,
    }
  }
  componentWillMount = () => {
    const bookSlug = this.props.params.slug
    this.props.getBookInfo(bookSlug, isUserLoggedIn)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.bookInfo !== this.state.bookInfo) {
      this.setState({
        bookInfo: nextProps.bookInfo
      })
      this.props.getStarsInfo('book', nextProps.bookInfo.id)
    }
    if (nextProps.starsInfo !== this.state.starsInfo) {
      this.setState({
        starsInfo: nextProps.starsInfo
      })
    }
  }

  render() {
    const { bookInfo, starsInfo } = this.state
    const { rates } = this.props

    return (
      <StoreNavView>
        <div>
          <div className='bookpage-main-container'>
            {bookInfo ?
              <BookInfo bookInfo={bookInfo} isUserLogged={isUserLoggedIn} /> :
              <div className='loading-animation-store' />
            }
            <div className='bookpage-announcement-container'>
              <div className='bookpage-announcement-details'>
                <h3>End of watch Thread</h3>
                <div className='bookpage-announcement-posts'>
                  <figure className='bookpage-announcement-posts-figure'>
                    <img src='/image/commented-bookstore-icon.svg'/>
                  </figure>
                  <span className='bookpage-announcement-posts-text'>
                    {rates ? rates.length : 0} {rates && rates.length > 1 ? 'Posts' : 'Post'}
                  </span>
                </div>
                <div className='bookpage-announcement-anchor-container'>
                  <Anchor
                    to='reviews'
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className='bookpage-announcement-anchor-text'
                  >
                    Join the convo
                  </Anchor>
                </div>
              </div>
              <figure className='bookpage-announcement-figure'>
                <img src='/image/chat-illustration.png'/>
              </figure>
            </div>
            {isUserLoggedIn ? <WishListBooks/> : null}
            <hr className='bookpage-hr-separator'/>
            { bookInfo && bookInfo.authors[0] ?
              (
                <MeetAuthor
                  profilePic={bookInfo.authors[0].imageUrl}
                  description={bookInfo.authors[0].aboutMe}
                  followers={bookInfo.authors[0].numFans}
                  books={bookInfo.authors[0].numBooks}
                  fullname={bookInfo.authors[0].fullname}
                  url={bookInfo.authors[0].url}
                />
              ) : null
            }
            <hr className='bookpage-hr-separator'/>
            <Element name='reviews'>
              {bookInfo ?
                (
                  <ReviewsOverview
                    reviewsInfo={{
                      internal: {
                        rating: bookInfo.rating,
                        starsInfo
                      },
                      goodreads: {
                        total: 4.3,
                      },
                      amazon: {
                        total: 3.8,
                      }
                    }}
                  />
                ) : null
              }
              <hr className='bookpage-hr-separator'/>
              {bookInfo ?
                <ReviewsContainer isLogged={isUserLoggedIn} bookInfo={bookInfo} /> :
                null
              }
            </Element>
            <hr className='bookpage-hr-separator'/>
            {isUserLoggedIn ? null : <NewsLetter />}
          </div>
          <div className='bookstore-footer-container'>
            <Footer />
          </div>
        </div>
      </StoreNavView>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    bookInfo: state.store.bookInfo,
    starsInfo: state.rates.starsInfo,
    rates: state.rates.bookRates,
  }
}

const mapDispatchToProps = {
  getBookInfo,
  getStarsInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
