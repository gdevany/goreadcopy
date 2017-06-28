import React, { PureComponent } from 'react'
import EditElementsModal from './EditElementsModal'

class ReviewOrder extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editModalOpen: false,
      modalRefference: false,
      shippingMethod: props.shippingMethod,
      shippingId: props.shippingId,
      isUsingLitcoins: props.usingLitcoins,
    }
    this.handleUseLitcoins = this.handleUseLitcoins.bind(this)
    this.handleEditModalClose = this.handleEditModalClose.bind(this)
  }

  handleEditModalOpen = (event, refference) => {
    this.setState({
      editModalOpen: true,
      modalRefference: refference,
    })
  }

  handleEditModalClose = () => {
    this.setState({
      editModalOpen: false,
      modalRefference: false,
    })
  }

  handleUseLitcoins = (event) => this.setState({ isUsingLitcoins: event.target.checked })

  setShippingMethod = (shippingMethod) => this.setState({ shippingMethod })

  mapShippingMethods = (shippingMethods) => {
    return shippingMethods.map((method, index) => {
      return (
        <div className='small-6 columns' key={`shipping_method_${index}`}>
          <div className='checkoutpage-steps-delivery-method'>
            <input
              className='checkoutpage-steps-delivery-method-input'
              name='delivery-method'
              type='radio'
              value={method.name}
              onClick={() => this.setShippingMethod(method.name)}
            />
            <label className='checkoutpage-steps-delivery-method-label'>
              <span className='checkoutpage-steps-delivery-method-vendor'>
                {method.title}
              </span>
              <span className='checkoutpage-steps-delivery-method-days'>
                5 - 7 business days
              </span>
              {method.cost ?
                (
                  <spam className='checkoutpage-steps-delivery-method-price'>
                    ${method.cost}
                  </spam>
                ) : null
              }
            </label>
          </div>
        </div>
      )
    })
  }

  render() {
    const { data, isPaypal } = this.props
    return (
      <section className='checkoutpage-order-review'>
        <h3> Review your order</h3>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-review-address-main'>
          <div className='checkoutpage-order-review-address-container'>
            <h4>Shipping Address</h4>
            <div className='checkoutpage-order-review-address-details'>
              <span className='checkoutpage-order-review-name'>
                {data.shippingAddress.name}
              </span>
              <span className='checkoutpage-order-review-address-text'>
                {data.shippingAddress.address}
              </span>
              <span className='checkoutpage-order-review-text-two'>
                {`${data.shippingAddress.city}, ${data.shippingAddress.state},
                ${data.shippingAddress.country}`}
              </span>
            </div>
          </div>
          <div className='checkoutpage-order-review-edit'>
            <a
              onClick={(event) => this.handleEditModalOpen(event, 'shipping')}
              className='checkoutpage-order-review-edit-btn'
            >
              Edit
            </a>
          </div>
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-review-card-main'>
          <div className='checkoutpage-order-review-card-container'>
            <h4>Payment</h4>
            {isPaypal ?
              (
                <div className='checkoutpage-order-review-paypal-details'>
                  <img className='paypal-image' src='/image/paypal-logo.png'/>
                </div>
              ) : (
                <div className='checkoutpage-order-review-card-details'>
                  <div className='checkoutpage-order-review-card-nums'>
                    {data.cardType === 'Visa' ?
                      (
                        <img
                          src='/image/visa-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    {data.cardType === 'Master' ?
                      (
                        <img
                          src='/image/master-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }

                    {data.cardType === 'American' ?
                      (
                        <img
                          src='/image/american-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    {data.cardType === 'Discover' ?
                      (
                        <img
                          src='/image/discover-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }
                    <span className='checkoutpage-order-review-card-last'>
                      {`**** **** **** ${data.cardLast4}`}
                    </span>
                    <span className='checkoutpage-order-review-card-exp'>
                      Expires {`${data.cardExpMonth}/${data.cardExpYear}`}
                    </span>
                  </div>
                  <span className='checkoutpage-order-review-card-name'>
                    {data.shippingAddress.name}
                  </span>
                  <span className='checkoutpage-order-review-card-address'>
                    {`${data.billingAddress.city}, ${data.billingAddress.state},
                    ${data.billingAddress.country}`}
                  </span>
                </div>
              )
            }
          </div>
          <div className='checkoutpage-order-review-edit'>
            <a
              onClick={(event) => this.handleEditModalOpen(event, 'card')}
              className='checkoutpage-order-review-edit-btn'
            >
              Edit
            </a>
          </div>
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-delivery-main'>
          <h4>Delivery</h4>
          <div className='row'>
            {this.props.shippingMethods ?
              this.mapShippingMethods(this.props.shippingMethods) : null
            }
          </div>
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        <section className='checkoutpage-litcoins-use-container'>
          <h3>Litcoins</h3>
          <div className='checkoutpage-litcoins-use-main'>
            <input
              className='checkoutpage-litcoins-useinput'
              type='checkbox'
              onChange={this.handleUseLitcoins}
              checked={this.state.isUsingLitcoins}
            />
            <label className='checkoutpage-litcoins-use-label'>
              <span className='checkoutpage-litcoins-use-label-span'>
                Use my Litcoins
              </span>
              <div className='checkoutpage-litcoins-use-details'>
                <span className='checkoutpage-litcoins-use-text'>
                  <b>$6.00</b> (8,000
                  <img
                    className='checkoutpage-litcoins-use-img'
                    src='/image/litcoin.png'
                  /> available)
                </span>
              </div>
            </label>
          </div>
        </section>
        <EditElementsModal
          modalOpen={this.state.editModalOpen}
          handleClose={this.handleEditModalClose}
          refference={this.state.modalRefference}
          isPaypal={isPaypal}
          shippingMethod={this.state.shippingMethod}
        />
      </section>
    )
  }
}
export default ReviewOrder
