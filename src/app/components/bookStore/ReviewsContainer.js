import React, { PureComponent } from 'react'
import Review from './Review'

class ReviewsContainer extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isLogged: false,
    }
  }
  componentWillMount = () => {
    this.setState({
      isLogged: this.props.isLogged,
    })
  }

  render() {
    const { isLogged } = this.state

    return (
      <div className='row'>
        <div className='small-12 large-7 columns'>
          <div className='bookage-reviews-container'>
            <Review />
            <Review />
            <Review />
          </div>
        </div>
        <div className='small-12 large-5 columns end'>
          {isLogged ?
            (
              <div className='bookpage-review-post-area-container'>
                <span className='bookpage-review-post-area-title'>
                  Post Your Review
                </span>
                <div className='bookpage-review-post-user-info'>
                  <figure className='bookpage-review-post-user-figure'>
                    <img src='/image/kendunn.jpg'/>
                  </figure>
                  <span className='bookpage-review-post-user-name'>
                    Ken Dunn
                  </span>
                </div>
                <div className='bookpage-review-post-stars-container'>
                  <span className='bookpage-review-post-stars-title'>
                    Your Book Rating:
                  </span>
                  <div className='bookpage-review-post-stars'>
                    <a className='bookpage-review-post-single-star' />
                    <a className='bookpage-review-post-single-star' />
                    <a className='bookpage-review-post-single-star' />
                    <a className='bookpage-review-post-single-star' />
                    <a className='bookpage-review-post-single-star' />
                  </div>
                </div>
                <div className='bookpage-review-post-comments-area'>
                  <textarea
                    className='bookpage-review-post-textarea'
                    placeholder='Write your review here'
                  />
                  <a className='bookpage-review-post-anchor'>
                    Post
                  </a>
                </div>
              </div>
            ) : (
              <div className='bookpage-reviews-sign-up-message-container'>
                <span className='bookpage-reviews-sign-up-message'>
                  Sign up to post your review
                </span>
                <a className='bookpage-reviews-sign-up-message-btn'>
                  Sign Up
                </a>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default ReviewsContainer
