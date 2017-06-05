import React, { PureComponent } from 'react'

class CartElement extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      bookCount: props.bookCount
    }
    this.handleBooksCount = this.handleBooksCount.bind(this)
  }

  handleBooksCount = (actionType) => {

    if (actionType === 1) {
      this.setState({ bookCount: this.state.bookCount + 1 })
    }
    if (actionType === 2 && this.state.bookCount > 0) {
      this.setState({ bookCount: this.state.bookCount - 1 })
    }

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
          </div>
        </div>
        <div className='bookpage-book-info-right'>
          <a className='bookpage-book-remove-item'> X </a>
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
export default CartElement
