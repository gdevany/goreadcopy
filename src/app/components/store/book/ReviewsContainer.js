import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Review from './Review'
import { Rates, Common } from '../../../redux/actions'
import { RegisterSignInModal } from '../../common'

const { getRates, postRateAndReview } = Rates
const { showAlert } = Common

const minLimit = 50
const maxLimit = 5000

class ReviewsContainer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isFetchingRates: false,
      modalLogInOpen: false,
      rates: false,
      currentReader: false,
      isStarClicked: false,
      starClicked: 0,
      reviewBody: '',
    }

    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.handleStarClick = this.handleStarClick.bind(this)
    this.handleReviewPost = this.handleReviewPost.bind(this)
    this.fetchRates = this.fetchRates.bind(this)

  }

  componentWillMount = () => {
    this.fetchRates(this.props.bookInfo.id)
  }

  componentWillReceiveProps = (nextProps) => {
    const { isLogged, bookInfo } = this.props
    if (nextProps.bookInfo.id !== bookInfo.id) {
      this.fetchRates(nextProps.bookInfo.id)
    }
    if (isLogged && nextProps.currentReader) {
      this.setState({ currentReader: nextProps.currentReader })
    }
  }

  fetchRates = (bookId) => {
    this.setState({ isFetchingRates: true })
    this.props.getRates('book', bookId)
      .then(()=>this.setState({ isFetchingRates: false }))
      .catch(()=>this.setState({ isFetchingRates: false }))
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
  }

  handleMapRates = () => {
    const { rates, isLogged } = this.props
    if (rates.length) {
      return rates.map((rate, index) => {
        return (
          <Review
            key={index}
            rateInfo={rate}
            currentReader={isLogged ? this.props.currentReader : null}
          />
        )
      })
    }
    return (
      <div className='bookpage-review-post-blank-state-container'>
        <figure className='bookpage-review-post-blank-state-figure'>
          <img
            src='/image/notifications_blank.png'
            className='bookpage-review-post-blank-state-img'
          />
        </figure>
        <p className='bookpage-review-post-blank-state-text'>
          This book still has not a review! Be the first to write one and win 50 litcoins!
        </p>
      </div>
    )
  }

  handleStarClick = (starClicked) => this.setState({ starClicked })

  handleTextChange = (event) => {
    event.preventDefault()
    this.setState({ reviewBody: event.target.value })
  }

  handleReviewPost = () => {
    const { bookInfo: { id } } = this.props
    const { reviewBody, starClicked } = this.state

    if (!starClicked) {
      this.props.showAlert({ type: 'error', message: 'Please, select a rate value!' })
      return false
    }

    if (reviewBody && reviewBody.length < minLimit) {
      this.props.showAlert({
        type: 'error',
        message: `Please, write at least ${minLimit} characters!`
      })
      return false
    }

    this.props.postRateAndReview('book', {
      rate: starClicked,
      id,
      body: reviewBody,
      book: id,
    }, this.props.bookInfo.slug)
      .then(()=>{
        this.props.showAlert({
          type: 'success',
          message: 'Your review has been posted succesfully!'
        })
        this.setState({ reviewBody: '', starClicked: 0 })
      })
      .catch(()=>{this.setState({ reviewBody: '', starClicked: 0 })})

    return true
  }

  render() {
    const { rates, isReviewed, isLogged, currentReaderId } = this.props
    const { currentReader, starClicked, reviewBody, isFetchingRates } = this.state

    return (
      <div className='row'>
        <div className='small-12 large-7 columns'>
          <div className='bookage-reviews-container'>
            {
              rates && !isFetchingRates ?
                this.handleMapRates() :
                <div className='loading-animation-store-big'/>
            }
          </div>
        </div>
        <div className='small-12 large-5 columns end'>
          { isLogged && currentReader && currentReaderId ?
              !isReviewed ?
                <div className='bookpage-review-post-area-container'>
                  <span className='bookpage-review-post-area-title'>
                    Post Your Review
                  </span>
                  <div className='bookpage-review-post-user-info'>
                    <figure className='bookpage-review-post-user-figure'>
                      <img src={currentReader.profileImage} />
                    </figure>
                    <span className='bookpage-review-post-user-name'>
                      {`${currentReader.firstName} ${currentReader.lastName}`}
                    </span>
                  </div>
                  <div className='bookpage-review-post-stars-container'>
                    <span className='bookpage-review-post-stars-title'>
                      Your Book Rating:
                    </span>
                    <div className='bookpage-review-post-stars'>
                      <a
                        onClick={() => this.handleStarClick(1)}
                        className={starClicked >= 1 ?
                          'bookpage-review-post-single-star-clicked' :
                          'bookpage-review-post-single-star'
                        }
                      />
                      <a
                        onClick={() => this.handleStarClick(2)}
                        className={starClicked >= 2 ?
                          'bookpage-review-post-single-star-clicked' :
                          'bookpage-review-post-single-star'
                        }
                      />
                      <a
                        onClick={() => this.handleStarClick(3)}
                        className={starClicked >= 3 ?
                          'bookpage-review-post-single-star-clicked' :
                          'bookpage-review-post-single-star'
                        }
                      />
                      <a
                        onClick={() => this.handleStarClick(4)}
                        className={starClicked >= 4 ?
                          'bookpage-review-post-single-star-clicked' :
                          'bookpage-review-post-single-star'
                        }
                      />
                      <a
                        onClick={() => this.handleStarClick(5)}
                        className={starClicked === 5 ?
                          'bookpage-review-post-single-star-clicked' :
                          'bookpage-review-post-single-star'
                        }
                      />
                    </div>
                  </div>
                  <div className='bookpage-review-post-comments-area'>
                    <textarea
                      onChange={this.handleTextChange}
                      className='bookpage-review-post-textarea'
                      placeholder='Write your review here'
                      value={reviewBody}
                      maxLength={maxLimit}
                    />
                    <p
                      className={reviewBody.length >= minLimit ?
                        'bookpage-review-post-limit-info complete' :
                        'bookpage-review-post-limit-info'
                      }
                    >
                      {`Post a review to gain 50 litcoins! (Minimum ${minLimit} characters)`}
                      <br/>
                      {'Number of characters: '}
                      <span>{reviewBody.length}</span>
                    </p>
                    <a
                      onClick={this.handleReviewPost}
                      className={
                        reviewBody.length >= minLimit ?
                          'bookpage-review-post-anchor active' :
                          'bookpage-review-post-anchor'
                      }
                    >
                      Post
                    </a>
                  </div>
                </div> :
                <div className='cart-blank-state'>
                  <figure>
                    <img src='/image/happyBook.png' alt='Book is reviewed!'/>
                  </figure>
                  <span className='cart-blank-title'>
                    Great!
                  </span>
                  <span className='cart-blank-subtitle'>
                    Your review has been submitted!
                  </span>
                </div> :
              <div className='bookpage-reviews-sign-up-message-container'>
                <span className='bookpage-reviews-sign-up-message'>
                  Sign up to post your review
                </span>
                <a
                  onClick={this.handleLogInModalOpen}
                  className='bookpage-reviews-sign-up-message-btn'
                >
                  Sign Up
                </a>
                <RegisterSignInModal
                  modalOpen={this.state.modalLogInOpen}
                  handleClose={this.handleLogInModalClose}
                />
              </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  rates: {
    bookRates
  },
  currentReader,
  store: {
    bookInfo: {
      isReviewed
    }
  }
}) => {
  return {
    rates: bookRates,
    currentReader,
    currentReaderId: currentReader.id,
    isReviewed
  }
}

const mapDistpatchToProps = {
  getRates,
  postRateAndReview,
  showAlert,
}

export default connect(mapStateToProps, mapDistpatchToProps)(ReviewsContainer)
