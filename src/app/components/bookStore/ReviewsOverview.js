import React, { PropTypes } from 'react'
import Rating from 'react-rating'

const renderRating = (rating) => {
  return (
    <Rating
      readonly={true}
      initialRate={rating}
      full={<img className='review-overview-rating-icon' src='/image/star-rating.png' />}
      empty={<img className='review-overview-rating-icon' src='/image/star-empty.png' />}
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
                <span className='bookpage-reviews-overview-internal-total-number'>
                  152
                </span>
                Reviews
              </h5>
              <div className='bookpage-reviews-overview-internal-detailed-container'>
                <div className='bookpage-reviews-overview-detailed-row'>
                  <span className='bookpage-reviews-overview-detailed-star'>5 star</span>
                  <div className='bookpage-reviews-overview-detailed-progress-back'>
                    <div className='bookpage-reviews-overview-detailed-progress-front'/>
                  </div>
                  <span className='bookpage-reviews-overview-detailed-count'>
                    89
                  </span>
                </div>
                <div className='bookpage-reviews-overview-detailed-row'>
                  <span className='bookpage-reviews-overview-detailed-star'>4 star</span>
                  <div className='bookpage-reviews-overview-detailed-progress-back'>
                    <div className='bookpage-reviews-overview-detailed-progress-front'/>
                  </div>
                  <span className='bookpage-reviews-overview-detailed-count'>
                    89
                  </span>
                </div>
                <div className='bookpage-reviews-overview-detailed-row'>
                  <span className='bookpage-reviews-overview-detailed-star'>3 star</span>
                  <div className='bookpage-reviews-overview-detailed-progress-back'>
                    <div className='bookpage-reviews-overview-detailed-progress-front'/>
                  </div>
                  <span className='bookpage-reviews-overview-detailed-count'>
                    89
                  </span>
                </div>
                <div className='bookpage-reviews-overview-detailed-row'>
                  <span className='bookpage-reviews-overview-detailed-star'>2 star</span>
                  <div className='bookpage-reviews-overview-detailed-progress-back'>
                    <div className='bookpage-reviews-overview-detailed-progress-front'/>
                  </div>
                  <span className='bookpage-reviews-overview-detailed-count'>
                    89
                  </span>
                </div>
                <div className='bookpage-reviews-overview-detailed-row'>
                  <span className='bookpage-reviews-overview-detailed-star'>1 star</span>
                  <div className='bookpage-reviews-overview-detailed-progress-back'>
                    <div
                      className='bookpage-reviews-overview-detailed-progress-front '
                    />
                  </div>
                  <span className='bookpage-reviews-overview-detailed-count'>
                    89
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='bookpage-reviews-overview-external-data' >
            <div className='bookpage-reviews-overview-external-rating-container'>
              <span className='bookpage-reviews-overview-external-rating-title'>
                Amazon Rating
              </span>
              <span className='bookpage-reviews-overview-external-rating-total'>
                {reviewsInfo.amazon.total}
              </span>
              <span className='bookpage-reviews-overview-external-rating-text'>
                out of 5
              </span>
              {renderRating(Math.round(reviewsInfo.amazon.total))}
            </div>
            <div className='bookpage-reviews-overview-external-rating-container'>
              <span className='bookpage-reviews-overview-external-rating-title'>
                GoodReads Rating
              </span>
              <span className='bookpage-reviews-overview-external-rating-total'>
                {reviewsInfo.goodreads.total}
              </span>
              <span className='bookpage-reviews-overview-external-rating-text'>
                out of 5
              </span>
              {renderRating(Math.round(reviewsInfo.goodreads.total))}
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
