import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import WishListBooks from '../common/wishListBooks'
import CartElement from './cartElement'
import SignUpModal from '../../common/SignUpModal'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import { Auth } from '../../../services'
import { Store, Common } from '../../../redux/actions'
import { Numbers } from '../../../utils'
import ShippingGiftAddressModal from './ShippingGiftAddressModal'

const { showAlert } = Common
const { getCartItems } = Store
const { parseFloatToUSD } = Numbers
let isUserLoggedIn = Auth.currentUserExists()
class CartPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      cart: false,
      anyGift: false,
      modalOpen: false,
      modalSighUpOpen: false,
      isCartLoading: true,
    }
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.createAlert = this.createAlert.bind(this)
    this.handleSignUpClose = this.handleSignUpClose.bind(this)
  }

  componentWillMount = () => {
    this.props.getCartItems({
      perPage: 50,
    }, isUserLoggedIn)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cart && nextProps.cart.itemsCount >= 0) {
      this.setState({
        cart: nextProps.cart,
        isCartLoading: false,
      })
      if (nextProps.cart.itemsCount > 0) this.checkGifts(nextProps.cart.items)
    }
  }

  handleSighUpModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalSighUpOpen: true })
  }

  handleSignUpClose = () => {
    this.setState({ modalSighUpOpen: false })
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
      if (item.isGiftItem && !item.giftcartitemdata.shippingAddress.id) {
        allGiftsReady = false
      }
    })
    if (!allGiftsReady) {
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
    this.props.showAlert({ message, type })
  }

  render() {
    const { cart, anyGift, isCartLoading } = this.state
    isUserLoggedIn = Auth.currentUserExists()
    return (
      <StoreNavView>
        <div className='root-cart-page'>
          <div className='cartpage-main-container'>
            <section className='cartpage-main-element-container'>
              <div className='row'>
                <div className='large-6 large-offset-3 columns'>
                  <section className='cartpage-container'>
                    <h2 className='cartpage-title'>Your Cart</h2>
                    <div className='cartpage-elements-container'>
                      {cart && cart.itemsCount > 0 ?
                        this.mapCartItems() : isCartLoading ?
                          (<div className='loading-animation-store-big'/>) : (
                          <div className='cart-blank-state'>
                            <figure>
                              <img src='/image/sadBook.png' alt='No items in cart'/>
                            </figure>
                            <span className='cart-blank-title'>
                              Your cart is empty!
                            </span>
                            <span className='cart-blank-subtitle'>
                              Go and find something nice to buy :)
                            </span>
                            <Link
                              className='cart-blank-anchor'
                              to='/browse'
                            >
                              Go to store
                            </Link>
                          </div>
                        )
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
                    {cart && cart.itemsCount > 0 ?
                      (
                        <div className='cartpage-subtotal-container'>
                          <span className='bookpage-subtotal-title'>Subtotal</span>
                          <h3 className='bookpage-subtotal-price'>
                            {cart ? parseFloatToUSD(cart.subtotalPrice) : parseFloatToUSD(0)}
                          </h3>
                        </div>
                      ) : null
                    }
                    {cart && cart.itemsCount > 0 ?
                      (
                        <div className='cartpage-action-btns-container'>
                          <Link className='cartpage-action-secondary-btn' to='/browse'>
                            Continue shopping
                          </Link>
                          <Link
                            onClick={
                              isUserLoggedIn ?
                              this.handleCheckout :
                              this.handleSighUpModalOpen
                            }
                            className='store-primary-button float-right'
                            to='/shop/checkout'
                          >
                            Checkout
                          </Link>
                        </div>
                      ) : null
                    }
                  </section>
                </div>
              </div>
            </section>
            {isUserLoggedIn ? <WishListBooks/> : null}
            <SignUpModal
              modalOpen={this.state.modalSighUpOpen}
              handleClose={this.handleSignUpClose}
            />
          </div>
          <div className='bookstore-footer-container'>
            <Footer />
          </div>
        </div>
      </StoreNavView>
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

const mapDispatchToProps = ({
  getCartItems,
  showAlert,
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
