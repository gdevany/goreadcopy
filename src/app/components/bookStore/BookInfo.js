import React, { PureComponent } from 'react'
import Rating from 'react-rating'

class BookInfo extends PureComponent {

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='bookpage-rating-icon' src='/image/star-rating.png' />}
        empty={<img className='bookpage-rating-icon' src='/image/star-empty.png' />}
      />
    )
  }

  render() {
    return (
      <div className='row bookpage-info-main-container'>
        <div className='small-12 large-6 large-offset-1 columns bookpage-info-left-element'>
          <div className='bookpage-info-left-top'>
            <figure className='bookpage-info-figure'>
              <img src='/image/example3.png'/>
            </figure>
            <div className='bookpage-book-description-container'>
              <h4 className='bookpage-book-title'>
                End of watch
              </h4>
              <div className='bookpage-author-container'>
                <figure className='bookpage-author-badge-figure'>
                  <img src='/image/kendunn.jpg'/>
                </figure>
                <div className='bookpage-author-info'>
                  <h5 className='bookpage-author-name'>Stephen King</h5>
                  <a className='bookpage-author-follow-action'> Follow</a>
                </div>
              </div>
              <div className='bookpage-rating-container'>
                <span className='rating'>
                  {this.renderRating(4)}
                </span>
                <span className='review-counts'>
                  157 Reviews
                </span>
              </div>
              <div className='bookpage-book-excerpt-container'>
                <p className='bookpage-book-excerpt'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Beatae quo, itaque soluta, sit doloremque odio? Voluptates
                  ducimus, corrupti, praesentium blanditiis reiciendis vel ex aut
                  nisi eveniet ut. Necessitatibus asperiores, rerum...
                  <a className='bookpage-book-excerpt-readmore-btn'>
                    See more
                  </a>
                </p>
              </div>
              {/* <div className='bookpage-trailer-btn'>
                Watch the trailer
              </div> */}
            </div>
          </div>
          <div className='bookpage-info-left-bottom'>
            <div className='bookpage-bottom-action-btn'>
              <figure>
                <img src='/image/wish-list-icon.svg'/>
              </figure>
              <span>Add to Wish List</span>
            </div>
            <div className='bookpage-bottom-action-btn'>
              <figure>
                <img src='/image/wish-list-icon.svg'/>
              </figure>
              <span>Add to Library</span>
            </div>
            <div className='bookpage-bottom-action-btn'>
              <figure>
                <img src='/image/wish-list-icon.svg'/>
              </figure>
              <span>Share</span>
            </div>
          </div>
        </div>
        <div className='small-12 large-4 columns bookpage-info-right-element'>
          Book Price
        </div>
      </div>
    )
  }
}

export default BookInfo
