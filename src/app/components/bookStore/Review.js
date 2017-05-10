import React, { PureComponent } from 'react'
import Rating from 'react-rating'

class Review extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='review-rating-icon' src='/image/star-rating.png' />}
        empty={<img className='review-rating-icon' src='/image/star-empty.png' />}
      />
    )
  }

  render() {

    // const {
    //   userPic,
    //   fullname,
    //   timestamp,
    //   review,
    // } = this.props

    return (
      <div
        className='bookpage-single-review'
      >
        <div className='bookpage-review-header'>
          <figure className='bookpage-review-figure'>
            <a>
              <img src='/image/kendunn.jpg'/>
            </a>
          </figure>
          <div className='bookpage-review-header-details'>
            <div className='bookpage-review-header-top'>
              <a className='bookpage-review-fullname'>
                Ken Dunn
              </a>
              <div className='bookpage-review-rating'>
                {this.renderRating(5)}
              </div>
            </div>
            <div className='bookpage-review-timestamp'>
              <span className='bookpage-review-timestamp-text'>
                January 15, 2017
              </span>
            </div>
          </div>
        </div>
        <div className='bookpage-review-body'>
          <p className='bookpage-review-body-text'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse,
            iste, iure. Perferendis commodi optio at, fuga cupiditate molestiae
            maiores corrupti, vel saepe, minus laudantium. Assumenda voluptas
            itaque nostrum ea ratione?
          </p>
        </div>
        <div className='bookpage-review-footer'>
          <div className='bookpage-review-footer-container'>
            <div className='likes-count'>
              <a className='not-liked' />
              <span className='not-liked-number'>0</span>
            </div>
            <div className='comments-count'>
              <a className='not-commented' />
              <span className='not-commented-number'>0</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Review
