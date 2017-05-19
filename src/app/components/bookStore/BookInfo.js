import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../redux/actions'
import Rating from 'react-rating'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import { Follow } from '../../redux/actions'

const { followOrUnfollow } = Follow
const { addToCart, addToLibrary, addToWishList } = Store

class BookInfo extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      addToCartClicked: false,
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this)
    this.handleAddToWishList = this.handleAddToWishList.bind(this)
    this.handleFollowOrUnFollow = this.handleFollowOrUnFollow.bind(this)
  }

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

  handleAddToCart = (event) => {
    event.preventDefault()
    this.props.addToCart(this.props.bookInfo.id)
    this.setState({
      addToCartClicked: true,
    })
  }

  handleAddToLibrary = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged } = this.props
    this.props.addToLibrary(bookInfo.ean, bookInfo.slug, isUserLogged)
  }

  handleAddToWishList = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged } = this.props
    this.props.addToWishList(bookInfo.ean, bookInfo.slug, isUserLogged)
  }

  handleFollowOrUnFollow = (event) => {
    event.preventDefault()
    const { bookInfo } = this.props
    if (bookInfo.authors.length) {
      this.props.followOrUnfollow({
        follow: !bookInfo.authors[0].userIsFollower,
        context: 'bookpage',
        userType: 'AUTHOR',
        ids: [bookInfo.authors[0].id],
        slug: bookInfo.slug
      })
    }
  }

  render() {
    const { bookInfo, isUserLogged } = this.props
    const { addToCartClicked } = this.state
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
                  { isUserLogged ?
                    bookInfo.authors.length && bookInfo.authors[0].userIsFollower ?
                      (
                        <a
                          className='bookpage-author-follow-action-active'
                          onClick={this.handleFollowOrUnFollow}
                        >
                          Following
                        </a>
                      ) : (
                      <a
                        className='bookpage-author-follow-action'
                        onClick={this.handleFollowOrUnFollow}
                      >
                        Follow
                      </a>
                    ) : <a className='bookpage-author-follow-action'> Follow</a>
                  }
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
            {bookInfo.isOnWishlist ?
              (
                <div className='bookpage-bottom-action-btn'>
                  <figure>
                    <img src='/image/wish-list-icon.svg'/>
                  </figure>
                  <span className='bookpage-action-btn-active-text'>Book in Wish List</span>
                </div>
              ) : (
                <div className='bookpage-bottom-action-btn' onClick={this.handleAddToWishList}>
                  <figure>
                    <img src='/image/add-to-wishlist.svg'/>
                  </figure>
                  <span>Add to Wish List</span>
                </div>
              )
            }
            {bookInfo.isOnLibrary ?
              (
                <div className='bookpage-bottom-action-btn'>
                  <figure>
                    <img src='/image/added-to-library.svg'/>
                  </figure>
                  <span className='bookpage-action-btn-active-text'>In your Library</span>
                </div>
              ) : (
                <div className='bookpage-bottom-action-btn' onClick={this.handleAddToLibrary}>
                  <figure>
                    <img src='/image/add-to-library.svg'/>
                  </figure>
                  <span>Add to Library</span>
                </div>
              )
            }
            <div className='bookpage-bottom-action-btn'>
              <ReplyIcon />
              <span>Share</span>
            </div>
          </div>
        </div>
        <div className='small-12 large-4 columns end bookpage-info-right-element'>
          <div className='bookpage-info-right-element-main-container'>
            <span className='bookpage-book-details-cover'> Paperback </span>
            <h3 className='bookpage-book-details-price'>
              {bookInfo.isOnSale ? `$${bookInfo.onSalePrice}` : `$${bookInfo.shopPrice}`}
              </h3>
            {bookInfo.isOnSale ?
              (
                <div className='bookpage-book-details-saving-container'>
                  <span className='bookpage-book-details-saving-old-price'>
                    {`$${bookInfo.shopPrice}`}
                  </span>
                      |
                      <span className='bookpage-book-details-saving-percentage'>
                    Save %{this.calculateSaving(bookInfo.onSalePrice, bookInfo.shopPrice)}
                  </span>
                </div>
              ) : null}
            <div className='bookpage-book-details-litcoin-price-container'>
              <span className='bookpage-book-details-litcoin-price-prefix'>
                Retail Price:
              </span>
              <div className='bookpage-book-details-litcoin-price'>
                <span className='bookpage-book-details-litcoin-price-text'>
                  {bookInfo.listPrice ? `$${bookInfo.listPrice.toLocaleString()}` : null}
                </span>
              </div>
            </div>
            <div className='bookpage-book-details-litcoin-price-container'>
              <span className='bookpage-book-details-litcoin-price-prefix'>
                Litcoin Price:
              </span>
              <div className='bookpage-book-details-litcoin-price'>
                <span className='bookpage-book-details-litcoin-price-text'>
                  {bookInfo.priceInLitcoins ? bookInfo.priceInLitcoins.toLocaleString() : null}
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
              {isUserLogged ?
                (
                  <a
                    className='bookpage-book-add-to-cart-btn'
                    onClick={!addToCartClicked ? this.handleAddToCart : null}
                    href={addToCartClicked ? '/store/cart' : null}
                  >
                    {addToCartClicked ? 'View Cart & Proceed to checkout' : 'Add to Cart'}
                  </a>
                ) : (
                  <a className='bookpage-book-add-to-cart-btn'>
                    Add to Cart
                  </a>
                )
              }
            </div>
            <div className='bookpage-book-piggy-bank-container'>
              <figure className='bookpage-book-piggy-bank-figure'>
                <img src='/image/piggy-bank.png'/>
              </figure>
              <div className='bookpage-book-piggy-bank-text-container'>
                Receive
                {/*<b> ${bookInfo.dollarsSaving.toLocaleString()} </b>*/}
                <span className='bookpage-book-piggy-bank-text-lit'>
                  <b>{bookInfo.litcoinsSaving.toLocaleString()}</b>
                  <img className='litcoin-img' src='/image/litcoin.png' />
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

const mapDistpachToProps = {
  addToLibrary,
  addToWishList,
  addToCart,
  followOrUnfollow
}
export default connect(null, mapDistpachToProps)(BookInfo)
