import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import WishListBooks from '../common/wishListBooks'
import CartElement from './cartElement'
import { BookStoreNavBar, Footer, Alerts } from '../../common'
import { Auth } from '../../../services'
import { Store } from '../../../redux/actions'
import ShippingGiftAddressModal from './ShippingGiftAddressModal'

const isUserLoggedIn = Auth.currentUserExists()
const { getCartItems, setOrder } = Store
const { SnackBarAlert } = Alerts

class CartPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      cart: false,
      anyGift: false,
      modalOpen: false,
      alert: null,
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.createAlert = this.createAlert.bind(this)
  }

  componentWillMount = () => {
    if (!isUserLoggedIn) {
      browserHistory.push('/')
    }
    this.props.getCartItems({
      perPage: 50,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cart && nextProps.cart.itemsCount >= 0) {
      this.setState({
        cart: nextProps.cart
      })
      if (nextProps.cart.itemsCount > 0) this.checkGifts(nextProps.cart.items)
    }
  }

  handleModalOpen = (event) => {
    this.setState({ modalOpen: true })
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
    })
  }

  handleCheckout = (ev) => {
    // Validate gifting
    let allGiftsReady = true
    this.props.cart.items.map((item) => {
      if (item.isGiftItem && !item.giftcartitemdata.shippingAddress) {
        allGiftsReady = false
      }
    })
    if (allGiftsReady) {
      this.props.setOrder()
    } else {
      this.createAlert('A gift is pending address...', 'error')
      ev.preventDefault()
    }
  }

  checkGifts = (items) => {
    for (let i = 0; i < items.length ; i++) {
      if (items[i].isGiftItem) {
        this.setState({
          anyGift: true
        })
        break
      } else this.setState({ anyGift: false })
    }
  }

  mapCartItems = () => {
    const { cart } = this.state
    return cart.items.map((item, index) => {
      return (
        <CartElement
          key={item.id}
          bookImage={item.product.imageUrl}
          bookTile={item.product.name}
          authorFullName={item.product.seller}
          paperType={false}
          isGift={item.isGiftItem}
          giftData={item.giftcartitemdata}
          bookCount={item.quantity}
          bookPrice={item.product.unitPrice}
          litcoinsPrice={item.product.litcoinsPrice}
          bookId={item.product.id}
          itemId={item.id}
        />
      )
    })
  }

  createAlert = (message, type) => {
    if (!this.state.alert) {
      this.setState({
        alert: {
          message,
          type,
        }
      })
    }
  }

  render() {
    const { cart, anyGift } = this.state
    return (
      <div className='root-cart-page'>
        <BookStoreNavBar/>
        <div className='cartpage-main-container'>
          <section className='cartpage-main-element-container'>
            <div className='row'>
              <div className='large-6 large-offset-3 columns'>
                <section className='cartpage-container'>
                  <h2 className='cartpage-title'>Your Cart</h2>
                  <div className='cartpage-elements-container'>
                    {cart && cart.itemsCount > 0 ?
                      this.mapCartItems() : null
                    }
                    {anyGift ?
                      (
                        <div className='cartpage-set-gifts-shipping'>
                          <a
                            onClick={this.handleModalOpen}
                            className='cartpage-set-gifts-btn'
                          >
                            Set Gifts Shipping Address
                          </a>
                          <ShippingGiftAddressModal
                            modalOpen={this.state.modalOpen}
                            handleClose={this.handleModalClose}
                            cartElements={cart.items}
                          />
                        </div>
                      ) : null
                    }
                  </div>
                  <div className='cartpage-subtotal-container'>
                    <span className='bookpage-subtotal-title'>Subtotal</span>
                    <h3 className='bookpage-subtotal-price'>
                      ${cart ? cart.subtotalPrice : 0.00}
                    </h3>
                  </div>
                  <div className='cartpage-action-btns-container'>
                    <a className='cartpage-action-secondary-btn' href='/browse'>
                      Continue shopping
                    </a>
                    {cart && cart.itemsCount > 0 ?
                      (
                        <Link
                          onClick={this.handleCheckout}
                          className='store-primary-button float-right'
                          to='/shop/checkout'
                        >
                          Checkout
                        </Link>
                      ) : null
                    }
                  </div>
                </section>
              </div>
            </div>
          </section>
          {isUserLoggedIn ? <WishListBooks/> : null}
        </div>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
        { this.state.alert ?
          <SnackBarAlert
            open={true}
            message={this.state.alert.message}
            autoHideDuration={3000}
            onRequestClose={()=>{this.setState({ alert: null })}}
            type={this.state.alert.type}
          /> : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  store
}) => {
  return {
    cart: store.cartItems,
  }
}

export default connect(mapStateToProps, { getCartItems, setOrder })(CartPage)
