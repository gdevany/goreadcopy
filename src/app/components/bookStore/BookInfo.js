import React, { PureComponent } from 'react'
import Rating from 'react-rating'
import ReplyIcon from 'material-ui/svg-icons/content/reply'

class BookInfo extends PureComponent {

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  calculateSaving = (shopPrice, listPrice) => {
    return Math.round((((listPrice - shopPrice) * 100) / listPrice))
  }

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
    const { bookInfo } = this.props
    return (
      <div className='row bookpage-info-main-container'>
        <div className='small-12 large-6 large-offset-1 columns bookpage-info-left-element'>
          <div className='bookpage-info-left-top'>
            <figure className='bookpage-info-figure'>
              <img src={bookInfo.imageUrl}/>
            </figure>
            <div className='bookpage-book-description-container'>
              <h4 className='bookpage-book-title'>
                {this.truncInfo(bookInfo.title, 45)}
              </h4>
              <div className='bookpage-author-container'>
                <figure className='bookpage-author-badge-figure'>
                  <img src={bookInfo.authors.length ? bookInfo.authors[0].imageUrl : ''}/>
                </figure>
                <div className='bookpage-author-info'>
                  <h5 className='bookpage-author-name'>
                    {bookInfo.authors.length ? bookInfo.authors[0].fullname : ''}
                  </h5>
                  <a className='bookpage-author-follow-action'> Follow</a>
                </div>
              </div>
              <div className='bookpage-rating-container'>
                <span className='rating'>
                  {this.renderRating(Math.round(bookInfo.rating.average))}
                </span>
                <span className='review-counts'>
                  {bookInfo.rating.total} Reviews
                </span>
              </div>
              <div className='bookpage-book-excerpt-container-desktop'>
                <p className='bookpage-book-excerpt'>
                  {this.truncInfo(bookInfo.description, 350)}
                  {/*<a className='bookpage-book-excerpt-readmore-btn'>*/}
                    {/*See more*/}
                  {/*</a>*/}
                </p>
              </div>
              {/* <div className='bookpage-trailer-btn'>
                Watch the trailer
              </div> */}
            </div>
          </div>
          <div className='bookpage-book-excerpt-container-mobile'>
            <p className='bookpage-book-excerpt'>
              {this.truncInfo(bookInfo.description, 350)}
              {/*<a className='bookpage-book-excerpt-readmore-btn'>*/}
                {/*See more*/}
              {/*</a>*/}
            </p>
          </div>
          <div className='bookpage-info-left-bottom'>
            <div className='bookpage-bottom-action-btn'>
              <figure>
                <img src='/image/add-to-wishlist.svg'/>
              </figure>
              <span>Add to Wish List</span>
            </div>
            <div className='bookpage-bottom-action-btn'>
              <figure>
                <img src='/image/add-to-library.svg'/>
              </figure>
              <span>Add to Library</span>
            </div>
            <div className='bookpage-bottom-action-btn'>
              <ReplyIcon />
              <span>Share</span>
            </div>
          </div>
        </div>
        <div className='small-12 large-4 columns end bookpage-info-right-element'>
          <div className='bookpage-info-right-element-main-container'>
            <span className='bookpage-book-details-cover'> Paperback </span>
            <h3 className='bookpage-book-details-price'>{`$${bookInfo.shopPrice}`}</h3>
            <div className='bookpage-book-details-saving-container'>
              <span className='bookpage-book-details-saving-old-price'>
                {`$${bookInfo.listPrice}`}
              </span>
              |
              <span className='bookpage-book-details-saving-percentage'>
                Save %{this.calculateSaving(bookInfo.shopPrice, bookInfo.listPrice)}
              </span>
            </div>
            <div className='bookpage-book-details-litcoin-price-container'>
              <span className='bookpage-book-details-litcoin-price-prefix'>
                Litcoin Price:
              </span>
              <div className='bookpage-book-details-litcoin-price'>
                <span className='bookpage-book-details-litcoin-price-text'>
                  25,502
                </span>
                <img className='litcoin-img' src='/image/litcoin.png' />
              </div>
            </div>
            <div className='bookpage-book-details-paper-type-selector-container'>
              <ul className='bookpage-book-details-paper-type-selector'>
                <li className='bookpage-book-details-paper-type'>
                  <span className='bookpage-book-details-paper-type-text'>
                    Paperback
                  </span>
                  <span className='bookpage-book-details-paper-type-price'>
                    {`$${bookInfo.shopPrice}`}
                  </span>
                </li>
                {/*<li className='bookpage-book-details-paper-type'>*/}
                  {/*<span className='bookpage-book-details-paper-type-text'>*/}
                    {/*Hardcover*/}
                  {/*</span>*/}
                  {/*<span className='bookpage-book-details-paper-type-price'>*/}
                    {/*$ 21.28*/}
                  {/*</span>*/}
                {/*</li>*/}
                {/*<li className='bookpage-book-details-paper-type'>*/}
                  {/*<span className='bookpage-book-details-paper-type-text'>*/}
                    {/*Audio Book*/}
                  {/*</span>*/}
                  {/*<span className='bookpage-book-details-paper-type-price'>*/}
                    {/*$ 4.28*/}
                  {/*</span>*/}
                {/*</li>*/}
              </ul>
            </div>
            <div className='bookpage-book-add-to-cart-container'>
              <a className='bookpage-book-add-to-cart-btn'>
                Add to Cart
              </a>
            </div>
            <div className='bookpage-book-piggy-bank-container'>
              <figure className='bookpage-book-piggy-bank-figure'>
                <img src='/image/piggy-bank.png'/>
              </figure>
              <div className='bookpage-book-piggy-bank-text-container'>
                Receive
                <b> $ 1.70 </b>
                <span className='bookpage-book-piggy-bank-text-lit'>
                  (5,231 <img className='litcoin-img' src='/image/litcoin.png' />)
                </span>
                back when buying with us.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookInfo
