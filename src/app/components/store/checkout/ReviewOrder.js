import React, { PureComponent } from 'react'
import UseLitcoins from './UseLitcoins'
import EditElementsModal from './EditElementsModal'

class ReviewOrder extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editModalOpen: false,
      modalRefference: false,
    }
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

  render() {
    return (
      <section className='checkoutpage-order-review'>
        <h3> Review your order</h3>
        <hr className='checkoutpage-order-review-divider'/>
        <article className='checkoutpage-order-review-address-main'>
          <div className='checkoutpage-order-review-address-container'>
            <h4>Shipping Address</h4>
            <div className='checkoutpage-order-review-address-details'>
              <span className='checkoutpage-order-review-name'>
                Jenny Olofmeister
              </span>
              <span className='checkoutpage-order-review-address-text'>
                1615 16th St.
              </span>
              <span className='checkoutpage-order-review-text-two'>
                Santa Monica, CA 9042, United States
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
            <div className='checkoutpage-order-review-card-details'>
              <div className='checkoutpage-order-review-card-nums'>
                <img src='/image/visa-black.png' className='checkoutpage-order-review-card-type'/>
                <span className='checkoutpage-order-review-card-last'>
                  *****4910
                </span>
                <span className='checkoutpage-order-review-card-exp'>
                  Expires 12/21
                </span>
              </div>
              <span className='checkoutpage-order-review-card-name'>
                Jenny Olofmeister
              </span>
              <span className='checkoutpage-order-review-card-address'>
                Santa Monica, CA 9042, United States
              </span>
            </div>
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
            <div className='small-6 columns'>
              <div className='checkoutpage-steps-delivery-method'>
                <input
                  className='checkoutpage-steps-delivery-method-input'
                  type='radio'
                />
                <label className='checkoutpage-steps-delivery-method-label'>
                  <span className='checkoutpage-steps-delivery-method-vendor'>
                    USPS Media Mail
                  </span>
                  <span className='checkoutpage-steps-delivery-method-days'>
                    ~5 - 7 business days
                  </span>
                  <spam className='checkoutpage-steps-delivery-method-price'>
                    $4.99
                  </spam>
                </label>
              </div>
            </div>
            <div className='small-6 columns'>
              <div className='checkoutpage-steps-delivery-method'>
                <input
                  className='checkoutpage-steps-delivery-method-input'
                  type='radio'
                />
                <label className='checkoutpage-steps-delivery-method-label'>
                  <span className='checkoutpage-steps-delivery-method-vendor'>
                    USPS Priority Mail
                  </span>
                  <span className='checkoutpage-steps-delivery-method-days'>
                   2 - 3 business days
                  </span>
                  <spam className='checkoutpage-steps-delivery-method-price'>
                    $8.99
                  </spam>
                </label>
              </div>
            </div>
          </div>
        </article>
        <hr className='checkoutpage-order-review-divider'/>
        <UseLitcoins />
        <EditElementsModal
          modalOpen={this.state.editModalOpen}
          handleClose={this.handleEditModalClose}
          refference={this.state.modalRefference}
        />
      </section>
    )
  }
}
export default ReviewOrder
