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
        <div className='small-12 large-6 columns'>
          <div className='bookage-reviews-container'>
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
          </div>
        </div>
        <div className='small-12 large-6 columns'>
          {isLogged ?
            (
              <div>
                Post review area here
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
