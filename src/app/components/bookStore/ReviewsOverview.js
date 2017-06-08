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

  const { rating, starsInfo } = reviewsInfo.internal
  const calculateProgress = (count, total) => {
    if (total > 0) return `${(count * 100) / total}%`
    return '0%'
  }
  if (reviewsInfo.internal && starsInfo) {
    return (
      <div className='row'>
        <div className='large-12 columns bookpage-reviews-overview-main-container'>
          <h3 className='bookpage-reviews-overview-main-title'>
            Reader Reviews
          </h3>
          <div className='bookpage-reviews-overview-container'>
            <div className='bookpage-reviews-overview-internal-data'>
              <div className='bookpage-reviews-overview-internal-left'>
                {renderRating(Math.round(rating.average))}
                <div className='bookpage-reviews-overview-internal-total-square'>
                <span className='bookpage-reviews-overview-internal-total'>
                  {Math.round(rating.average * 100) / 100}
                </span>
                  <span className='bookpage-reviews-overview-internal-text'>
                  out of 5
                </span>
                </div>
              </div>
              <div className='bookpage-reviews-overview-internal-right'>
                <h5 className='bookpage-reviews-overview-internal-total'>
                <span className='bookpage-reviews-overview-internal-total-number'>
                  {rating.count}
                </span>
                  {rating.count === 0 || rating.count > 1 ?
                    'Reviews' : 'Review'
                  }
                </h5>
                <div className='bookpage-reviews-overview-internal-detailed-container'>
                  <div className='bookpage-reviews-overview-detailed-row'>
                    <span className='bookpage-reviews-overview-detailed-star'>5 star</span>
                    <div className='bookpage-reviews-overview-detailed-progress-back'>
                      <div
                        style={{ width: calculateProgress(starsInfo.five, rating.count) }}
                        className='bookpage-reviews-overview-detailed-progress-front'
                      />
                    </div>
                    <span className='bookpage-reviews-overview-detailed-count'>
                    {starsInfo.five}
                  </span>
                  </div>
                  <div className='bookpage-reviews-overview-detailed-row'>
                    <span className='bookpage-reviews-overview-detailed-star'>4 star</span>
                    <div className='bookpage-reviews-overview-detailed-progress-back'>
                      <div
                        style={{ width: calculateProgress(starsInfo.four, rating.count) }}
                        className='bookpage-reviews-overview-detailed-progress-front'
                      />
                    </div>
                    <span className='bookpage-reviews-overview-detailed-count'>
                    {starsInfo.four}
                  </span>
                  </div>
                  <div className='bookpage-reviews-overview-detailed-row'>
                    <span className='bookpage-reviews-overview-detailed-star'>3 star</span>
                    <div className='bookpage-reviews-overview-detailed-progress-back'>
                      <div
                        style={{ width: calculateProgress(starsInfo.three, rating.count) }}
                        className='bookpage-reviews-overview-detailed-progress-front'
                      />
                    </div>
                    <span className='bookpage-reviews-overview-detailed-count'>
                    {starsInfo.three}
                  </span>
                  </div>
                  <div className='bookpage-reviews-overview-detailed-row'>
                    <span className='bookpage-reviews-overview-detailed-star'>2 star</span>
                    <div className='bookpage-reviews-overview-detailed-progress-back'>
                      <div
                        style={{ width: calculateProgress(starsInfo.two, rating.count) }}
                        className='bookpage-reviews-overview-detailed-progress-front'
                      />
                    </div>
                    <span className='bookpage-reviews-overview-detailed-count'>
                    {starsInfo.two}
                  </span>
                  </div>
                  <div className='bookpage-reviews-overview-detailed-row'>
                    <span className='bookpage-reviews-overview-detailed-star'>1 star</span>
                    <div className='bookpage-reviews-overview-detailed-progress-back'>
                      <div
                        style={{ width: calculateProgress(starsInfo.one, rating.count) }}
                        className='bookpage-reviews-overview-detailed-progress-front'
                      />
                    </div>
                    <span className='bookpage-reviews-overview-detailed-count'>
                    {starsInfo.one}
                  </span>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className='bookpage-reviews-overview-external-data' >*/}
            {/*<div className='bookpage-reviews-overview-external-rating-container'>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-title'>*/}
            {/*Amazon Rating*/}
            {/*</span>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-total'>*/}
            {/*{reviewsInfo.amazon.total}*/}
            {/*</span>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-text'>*/}
            {/*out of 5*/}
            {/*</span>*/}
            {/*{renderRating(Math.round(reviewsInfo.amazon.total))}*/}
            {/*</div>*/}
            {/*<div className='bookpage-reviews-overview-external-rating-container'>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-title'>*/}
            {/*GoodReads Rating*/}
            {/*</span>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-total'>*/}
            {/*{reviewsInfo.goodreads.total}*/}
            {/*</span>*/}
            {/*<span className='bookpage-reviews-overview-external-rating-text'>*/}
            {/*out of 5*/}
            {/*</span>*/}
            {/*{renderRating(Math.round(reviewsInfo.goodreads.total))}*/}
            {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    )
  }
  return null
}
ReviewsOverview.propTypes = {
  reviewsInfo: PropTypes.object,
}

export default ReviewsOverview
