import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { Numbers } from '../../../utils'
import { debounce } from 'lodash'
import { Link } from 'react-router'
import GiftIcon from 'material-ui/svg-icons/action/card-giftcard'

const { updateCartItems, removeItemFromCart, convertToGift } = Store
const { parseFloatToUSD, parseIntToLocale } = Numbers

class CartElement extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookCount: props.bookCount,
      isGift: props.isGift
    }
    this.handleBookRemove = this.handleBookRemove.bind(this)
    this.handleBooksCount = this.handleBooksCount.bind(this)
    this.handleGiftBook = this.handleGiftBook.bind(this)
    this.handleDebounceUpdate = this.handleDebounceUpdate.bind(this)
  }

  handleBooksCount = (actionType) => {

    if (actionType === 1) {
      this.setState({ bookCount: this.state.bookCount + 1 })
    }
    if (actionType === 2 && this.state.bookCount > 1) {
      this.setState({ bookCount: this.state.bookCount - 1 })
    }
    this.handleDebounceUpdate()
  }

  handleDebounceUpdate = debounce(() => {
    const { bookCount } = this.state
    const { bookId, updateCartItems } = this.props
    updateCartItems(bookId, bookCount, this.props.isUserLoggedIn)
  }, 500)

  handleGiftBook = (event) => {
    this.setState({
      isGift: event.target.checked
    })
    this.props.convertToGift(this.props.itemId, {
      toGift: event.target.checked,
    }, this.props.isUserLoggedIn)
  }

  handleBookRemove = (event) => {
    event.preventDefault()
    const { itemId, removeItemFromCart } = this.props
    removeItemFromCart(itemId, this.props.isUserLoggedIn)
  }

  render() {

    const {
      bookImage,
      bookTile,
      authorFullName,
      paperType,
      bookPrice,
      litcoinsPrice,
      isGift,
      giftData,
    } = this.props

    const { bookCount } = this.state

    return (
      <div className='cargpage-single-element'>
        <div className='bookpage-book-info-left'>
          <Link
            className='cartpage-book-url'
          >
            <figure className='cartpage-book-figure'>
              <img src={bookImage}/>
            </figure>
          </Link>
          <div className='bookpage-book-information'>
            <span className='bookpage-book-info-title'>{bookTile}</span>
            <span className='bookpage-book-info-author'>by {authorFullName}</span>
            <span className='bookpage-book-info-paper'>{paperType}</span>
            <div className='bookpage-book-info-counters'>
              <a
                onClick={() => this.handleBooksCount(2)}
                className='bookpage-book-info-counter-btn'
              > - </a>
              <span className='bookpage-book-info-count'> {bookCount} </span>
              <a
                onClick={() => this.handleBooksCount(1)}
                className='bookpage-book-info-counter-btn'
              > + </a>
            </div>
            <div className='bookpage-book-gift-container'>
              <input
                className='bookpage-book-gift-input'
                type='checkbox'
                checked={this.state.isGift}
                onChange={this.handleGiftBook}
              />
              <span className='bookpage-book-gift-text'>Gift</span>
              <GiftIcon className='bookpage-book-gift-icon'/>
              { isGift && giftData && !giftData.shippingAddress.id ?
                  <span className='error'>
                    &nbsp;Gift has not shipping address!
                  </span> :
                  null
              }
            </div>
          </div>
        </div>
        <div className='bookpage-book-info-right'>
          <a
            onClick={this.handleBookRemove}
            className='bookpage-book-remove-item'
          >
            <span className='icon-cross' />
          </a>
          <div className='bookstore-book-price-info'>
            <span className='bookpage-book-price'>{parseFloatToUSD(bookPrice)}</span>
            <div className='bookpage-book-litcoin-price-container'>
              <span className='bookpage-book-litcoin-price'>
                {litcoinsPrice ? parseIntToLocale(litcoinsPrice) : null}
                </span>
              {litcoinsPrice ?
                <img className='bookpage-book-litcoin-img' src='/image/litcoin.png'/> : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = ({
  store
}) => {
  return {
    store
  }
}

const mapDispachToProps = {
  updateCartItems,
  removeItemFromCart,
  convertToGift
}

export default connect(mapStatetoProps, mapDispachToProps)(CartElement)
