import React, { PureComponent } from 'react'
import EditElementsModal from './EditElementsModal'
import { UseLitcoins, ShippingMethods } from './'

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

  render() {
    const { data, isPaypal } = this.props
    const cardDetails = {
      cardExpYear: data.cardExpYear,
      cardExpMonth: data.cardExpMonth,
      cardLast4: data.cardLast4,
      cardType: data.cardType,
      billing: data.billingAddress,
    }
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
          {data.status !== 40 ?
            (
              <div className='checkoutpage-order-review-edit'>
                <a
                  onClick={(event) => this.handleEditModalOpen(event, 'shipping')}
                  className='checkoutpage-order-review-edit-btn'
                >
                  Edit
                </a>
              </div>
            ) : null
          }
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
                    {data.cardType === 'MasterCard' ?
                      (
                        <img
                          src='/image/master-black.png'
                          className='checkoutpage-order-review-card-type'
                        />
                      ) : null
                    }

                    {data.cardType === 'AmericanExpress' ?
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
          {data.status !== 40 ?
            (
              <div className='checkoutpage-order-review-edit'>
                <a
                  onClick={(event) => this.handleEditModalOpen(event, 'card')}
                  className='checkoutpage-order-review-edit-btn'
                >
                  Edit
                </a>
              </div>
            ) : null
          }
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        {this.props.shippingMethods && data.status !== 40 ?
          <ShippingMethods
            shippingMethods={this.props.shippingMethods}
            onClick={this.setShippingMethod}
          /> : null
        }
        {data.status !== 40 ?
          (<hr className='checkoutpage-order-review-divider'/>) : null
        }
        <UseLitcoins
          onChange={this.handleUseLitcoins}
          boxChecked={this.state.isUsingLitcoins}
        />
        <EditElementsModal
          modalOpen={this.state.editModalOpen}
          handleClose={this.handleEditModalClose}
          refference={this.state.modalRefference}
          isPaypal={isPaypal}
          shippingMethod={this.state.shippingMethod}
          shippingAddress={data.shippingAddress}
          cardDetails={cardDetails}
          changePayment={this.props.changePayment}
        />
      </section>
    )
  }
}
export default ReviewOrder
