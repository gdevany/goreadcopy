import React, { PropTypes } from 'react'

const CardFrom = ({ cardInfo, onChange }) => {
  return (
    <section
      className={isCardClicked ?
        'checkoutpage-payment-card-container payment-selected' :
        'checkoutpage-payment-card-container'
      }
    >
      <div className='checkoutpage-payment-selector'>
        <div
          className={isCardClicked ?
            'checkoutpage-payment-selector-element selected-payment' :
            'checkoutpage-payment-selector-element'
          }
          onClick={() => this.handlePaymentClick('card')}
        >
          <a className='checkoutpage-payment-selector-anchor'/>
        </div>
      </div>
      <div className='checkoutpage-payment-card'>
        <div className='checkoutpage-payment-card-head'>
          <span className='checkoutpage-payment-card-head-title'>
            Card / Credit Card
          </span>
          <img
            className='checkoutpage-payment-card-head-img'
            src='/image/credit-cards.png'
          />
        </div>
        <div className='checkoutpage-payment-card-subhead'>
          <LockIcon className='checkoutpage-payment-card-subhead-icon'/>
          <span className='checkoutpage-payment-card-subhead-text'>
            Secure and encrypted
          </span>
        </div>
        <div className='checkoutpage-payment-card-form'>
          <div className='row'>
            <div className='large-12 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <label className='checkoutpage-payment-card-inputs-label'>
                  Name on Card
                </label>
                <input
                  type='text'
                  className='checkoutpage-payment-card-single-input'
                  onChange={this.handleFormsChanges('nameOnCard')}
                  value={nameOnCard}
                />
              </div>
            </div>
            <div className='large-12 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <label className='checkoutpage-payment-card-inputs-label'>
                  Card Number
                </label>
                <input
                  type='text'
                  className='checkoutpage-payment-card-single-input'
                  onChange={this.handleFormsChanges('cardNumber')}
                  value={cardNumber}
                />
              </div>
            </div>
            <div className='large-8 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <label className='checkoutpage-payment-card-inputs-label'>
                  Expiration Date (MM/YY)
                </label>
                <input
                  type='text'
                  className='checkoutpage-payment-card-single-input'
                  onChange={this.handleFormsChanges('fullExpDate')}
                  value={fullExpDate}
                />
              </div>
            </div>
            <div className='large-4 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <label className='checkoutpage-payment-card-inputs-label'>
                  CVC
                </label>
                <input
                  type='number'
                  min='100'
                  min='999'
                  className='checkoutpage-payment-card-single-input has-lock'
                  onChange={this.handleFormsChanges('cardCVC')}
                  value={cardCVC}
                />
                <LockIcon
                  className='checkoutpage-payment-card-single-input-lock'
                />
              </div>
            </div>
            {/* <div className='large-12 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <input
                  type='checkbox'
                  className='checkoutpage-payment-card-single-input-check'
                  onChange={this.handleCheckSave}
                  checked={this.state.saveCard}
                />
                <label className='checkoutpage-payment-card-inputs-label-check'>
                  Save card for future use
                </label>
              </div>
            </div> */}
            <div className='large-12 columns'>
              <div className='checkoutpage-payment-card-inputs'>
                <input
                  type='checkbox'
                  className='checkoutpage-payment-card-single-input-check'
                  onChange={this.handleCheckSame}
                  checked={this.state.sameShippingAddress}
                />
                <label className='checkoutpage-payment-card-inputs-label-check'>
                  Use shipping address
                </label>
              </div>
            </div>
          </div>
        </div>
        {!this.state.sameShippingAddress ?
          (
            <div className='row'>
              <div className='large-12 columns'>
                Billing Address
                <hr/>
                <div className='row'>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      First Name
                    </label>
                    <input
                      type='text'
                      onChange={this.handleFormsChanges('firstNameBilling')}
                      className='checkoutpage-steps-shipping-address-form-input'
                      value={this.state.firstNameBilling}
                    />
                  </div>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('lastNameBilling')}
                      value={this.state.lastNameBilling}
                    />
                  </div>
                  <div className='small-12 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      Address
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('addressBilling')}
                      value={this.state.addressBilling}
                    />
                  </div>
                  <div className='small-12 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      Address Line 2 *Optional
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('address2Billing')}
                      value={this.state.address2Billing}
                    />
                  </div>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      Country
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('countryBilling')}
                      value={this.state.countryBilling}
                    />
                  </div>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('cityBilling')}
                      value={this.state.cityBilling}
                    />
                  </div>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      State
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('stateBilling')}
                      value={this.state.stateBilling}
                    />
                  </div>
                  <div className='small-6 columns'>
                    <label
                      className='checkoutpage-steps-shipping-address-form-label'
                    >
                      Zipcode
                    </label>
                    <input
                      type='text'
                      className='checkoutpage-steps-shipping-address-form-input'
                      onChange={this.handleFormsChanges('zipcodeBilling')}
                      value={this.state.zipcodeBilling}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    </section>
  )
}

CardFrom.propTypes = {
  cardInfo: PropTypes.object,
  onChange: PropTypes.func
}

export default CardFrom
