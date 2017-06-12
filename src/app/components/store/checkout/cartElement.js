import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Store } from '../../../redux/actions'
import { debounce } from 'lodash'
import GiftIcon from 'material-ui/svg-icons/action/card-giftcard'

const { updateCartItems, removeItemFromCart } = Store

class CartElement extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookCount: props.bookCount
    }
    this.handleBookRemove = this.handleBookRemove.bind(this)
    this.handleBooksCount = this.handleBooksCount.bind(this)
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
    updateCartItems(bookId, bookCount)
  }, 500)

  handleBookRemove = (event) => {
    event.preventDefault()
    const { bookId, removeItemFromCart } = this.props
    removeItemFromCart(bookId)
  }

  render() {

    const {
      bookImage,
      bookTile,
      authorFullName,
      paperType,
      bookPrice,
      litcoinsPrice,
    } = this.props

    const { bookCount } = this.state

    return (
      <div className='cargpage-single-element'>
        <div className='bookpage-book-info-left'>
          <figure className='cartpage-book-figure'>
            <img src={bookImage}/>
          </figure>
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
              <input className='bookpage-book-gift-input' type='checkbox'/>
              <span className='bookpage-book-gift-text'>Gift</span>
              <GiftIcon className='bookpage-book-gift-icon'/>
            </div>
          </div>
        </div>
        <div className='bookpage-book-info-right'>
          <a
            onClick={this.handleBookRemove}
            className='bookpage-book-remove-item'
          >
            X
          </a>
          <div className='bookstore-book-price-info'>
            <span className='bookpage-book-price'> $ {bookPrice}</span>
            <div className='bookpage-book-litcoin-price-container'>
              <span className='bookpage-book-litcoin-price'>
                {litcoinsPrice ? litcoinsPrice.toLocaleString() : null}
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
export default connect(null, { updateCartItems, removeItemFromCart })(CartElement)
