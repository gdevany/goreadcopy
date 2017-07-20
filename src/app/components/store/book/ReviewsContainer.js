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
      isLogged: false,
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

  }
  componentWillMount = () => {
    this.setState({
      isLogged: this.props.isLogged,
    })
    this.props.getRates('book', this.props.bookInfo.id)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.rates && nextProps.rates !== this.state.rates) {
      this.setState({ rates: nextProps.rates })
    }
    if (this.state.isLogged && nextProps.currentReader) {
      this.setState({ currentReader: nextProps.currentReader })
    }
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
  }

  handleMapRates = () => {
    const { rates, isLogged } = this.state
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
    })
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
    const { isLogged, rates, currentReader, starClicked, reviewBody } = this.state

    return (
      <div className='row'>
        <div className='small-12 large-7 columns'>
          <div className='bookage-reviews-container'>
            {rates ? this.handleMapRates() : null}
          </div>
        </div>
        <div className='small-12 large-5 columns end'>
          {isLogged && currentReader ?
            (
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
                    {`Minimum ${minLimit} characters. Write a review and gain 50 litcoins: `}
                    <span>{reviewBody.length}</span>
                  </p>
                  <a
                    onClick={this.handleReviewPost}
                    className='bookpage-review-post-anchor'
                  >
                    Post
                  </a>
                </div>
              </div>
            ) : (
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
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    rates: state.rates.bookRates,
    currentReader: state.currentReader
  }
}

const mapDistpatchToProps = {
  getRates,
  postRateAndReview,
  showAlert,
}

export default connect(mapStateToProps, mapDistpatchToProps)(ReviewsContainer)
