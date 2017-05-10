import React, { PropTypes } from 'react'
import Rating from 'react-rating'

const renderRating = (rating) => {
  return (
    <Rating
      readonly={true}
      initialRate={rating}
      full={<img className='rating-icon' src='/image/star-rating.png' />}
      empty={<img className='rating-icon' src='/image/star-empty.png' />}
    />
  )
}

const ReviewsOverview = ({ reviewsInfo }) => {
  return (
    <div className='row'>
      <div className='large-12 columns bookpage-reviews-overview-main-container'>
        <h3 className='bookpage-reviews-overview-main-title'>
          Reader Reviews
        </h3>
        <div className='bookpage-reviews-overview-container'>
          <div className='bookpage-reviews-overview-internal-data'>
            <div className='bookpage-reviews-overview-internal-left'>
              {renderRating(Math.round(reviewsInfo.total))}
              <div className='bookpage-reviews-overview-internal-total-square'>
                <span className='bookpage-reviews-overview-internal-total'>
                  {reviewsInfo.total.toLocaleString()}
                </span>
                <span className='bookpage-reviews-overview-internal-text'>
                  out of 5
                </span>
              </div>
            </div>
            <div className='bookpage-reviews-overview-internal-right'>
              <h5 className='bookpage-reviews-overview-internal-total'>
                152 Reviews
              </h5>
              <div className='bookpage-reviews-overview-internal-detailed-container'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
ReviewsOverview.propTypes = {
  reviewsInfo: PropTypes.object,
}

export default ReviewsOverview
