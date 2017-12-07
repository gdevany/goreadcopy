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
// import NewsLetter from './NewsLetter'
import { Auth } from '../../../services'
import { Store, Rates } from '../../../redux/actions'

const { getBookInfo } = Store
const { getStarsInfo } = Rates
const Anchor = Scroll.Link
const { Element, animateScroll } = Scroll

class BookPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookInfo: null,
      starsInfo: null,
      isUserLoggedIn: Auth.currentUserExists(),
      bookDetails: {
        'Age Range': null,
        'Grade Level': null,
        'Series': null,
        'Hardcover': null,
        'Publisher': null,
        'Language': null,
        'ISBN': null,
        'Dimensions': null,
        'Weight': null,
        'Format': null,
        'Other Formats': null,
      }
    }
  }
  componentWillMount = () => {
    const { isUserLoggedIn } = this.state
    const bookSlug = this.props.params.slug
    this.props.getBookInfo(bookSlug, isUserLoggedIn)
      .then(()=>{animateScroll.scrollToTop()})
  }

  componentWillReceiveProps = (nextProps) => {
    const { isUserLoggedIn } = this.state
    const checkLog = Auth.currentUserExists()
    if (nextProps.params.slug !== this.props.params.slug || isUserLoggedIn !== checkLog) {
      this.props.getBookInfo(nextProps.params.slug, checkLog)
        .then(()=>{animateScroll.scrollToTop()})
    }
    if (nextProps.bookInfo && nextProps.bookInfo !== this.state.bookInfo) {
      this.setState({
        bookInfo: nextProps.bookInfo,
        isUserLoggedIn: checkLog
      })
      this.props.getStarsInfo('book', nextProps.bookInfo.id)
    }
    if (nextProps.starsInfo !== this.state.starsInfo) {
      this.setState({
        starsInfo: nextProps.starsInfo
      })
    }
    this.handleBookDetailsInfo()
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  handleBookDetailsInfo = () => {
    const { bookInfo } = this.state
    const ageRange = bookInfo ? bookInfo.audienceGradeMin && bookInfo.audienceGradeMax ?
      bookInfo.audienceGradeMin.code + ' - ' + bookInfo.audienceGradeMax.code : null : null
    const productDimensions = bookInfo ? bookInfo.length && bookInfo.width && bookInfo.height ?
      bookInfo.length + ' x ' + bookInfo.width + ' x ' + bookInfo.height + ' Inches' : null : null
    const otherFormats = this.handleOtherFormats(bookInfo.family)
    bookInfo ? (
      this.setState({
        bookDetails: {
          'Pages': bookInfo.pages,
          'Age Range': ageRange,
          'Grade Level': null,
          'Series': null,
          'Hardcover': null,
          'Publisher': bookInfo.publisher ? bookInfo.publisher.fullname : null,
          'Language': bookInfo.contentLanguage,
          'ISBN': bookInfo.ean,
          'Dimensions': productDimensions,
          'Weight': bookInfo.weight ? bookInfo.weight + ' Pounds' : null,
          'Format': bookInfo.productType ? bookInfo.productType.description : null,
          'Other Formats': otherFormats,
        }
      })
    ) : null
  }

  handleBookDetails = () => {
    const detailsArray = ['ISBN', 'Pages', 'Age Range', 'Grade Level',
      'Series', 'Hardcover', 'Publisher', 'Language', 'Format', 'Other Formats',
      'Dimensions', 'Weight']
    const result = detailsArray.map((detail, index) => {
      return this.handleRenderDetail(detail, index)
    })
    return (
      <div className='bookpage-book-details'>
        {result ? (
          <h3 className='center-text'>
            Book Details
          </h3>) : null
        }
        {result ? result : null}
      </div>
    )
  }

  handleRenderDetail = (detail, index) => {
    const { bookDetails } = this.state
    return bookDetails[detail] ? (
      <div key={index}>
        <p>
          <strong>
            {detail}:
          </strong>
          &nbsp; {bookDetails[detail]}
        </p>
      </div>
    ) : null
  }

  handleOtherFormats = (array) => {
    return array.map((item, index, array) => {
      return (
        <a key={index} href={item.url}>
          {item.description}{array.length - 1 > index ? ', ' : null}
        </a>
      )
    })
  }

  render() {
    const { bookInfo, starsInfo, isUserLoggedIn } = this.state
    const { rates, currentReader } = this.props
    return (
      <StoreNavView>
        <div>
          <div className='bookpage-main-container'>
            {bookInfo ?
              <BookInfo bookInfo={bookInfo} isUserLogged={isUserLoggedIn} /> :
              <div className='loading-animation-store' />
            }
            <div className='bookpage-announcement-container'>
              {this.handleBookDetails()}
              <div className='bookpage-announcement-details'>
                <h3>{bookInfo ? `${this.truncInfo(bookInfo.title, 30)} Thread` : null}</h3>
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
            {isUserLoggedIn && currentReader ? <WishListBooks/> : null}
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
              {
                bookInfo ?
                  <Element name='ratesAndReviews'>
                    <ReviewsContainer isLogged={isUserLoggedIn} bookInfo={bookInfo} />
                  </Element> :
                  null
              }
            </Element>
            <hr className='bookpage-hr-separator'/>
            {/* {isUserLoggedIn ? null : <NewsLetter />} */}
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
    currentReader: state.currentReader.id,
  }
}

const mapDispatchToProps = {
  getBookInfo,
  getStarsInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookPage)
