import React, { PureComponent } from 'react'

class ShippingMethods extends PureComponent {

  mapShippingMethods = (shippingMethods) => {
    const { onClick, shippingMethod } = this.props

    return shippingMethods.map((method, index) => {
      return (
        <div className='small-6 columns' key={`shipping_method_${index}`}>
          <div className='checkoutpage-steps-delivery-method'>
            <input
              className='checkoutpage-steps-delivery-method-input'
              name='delivery-method'
              type='radio'
              onClick={() => onClick(method.name)}
              defaultChecked={shippingMethod === method.name}
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
    const { shippingMethods } = this.props
    return (
      <section className='checkoutpage-steps-delivery-method-container'>
        <h3 className='checkoutpage-steps-delivery-method-title'>
          Delivery
        </h3>
        <div className='row'>
          {this.mapShippingMethods(shippingMethods)}
        </div>
      </section>
    )
  }
}

export default ShippingMethods
