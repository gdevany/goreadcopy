import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Paper from 'material-ui/Paper'
import { Footer } from '../../common'
import { StoreNavView } from '../../views'
import { SuccessBanner, OrderSummary } from './'
import { Store } from '../../../redux/actions'

const { cleanOrderAndCart } = Store

const styles = {
  orderPaper: {
    marginBottom: 25,
    padding: '1em',
  },
}

class orderSuccess extends PureComponent {

  componentWillUnmount() {
    this.props.cleanOrderAndCart()
  }

  render() {
    const { order } = this.props
    if (order) {
      const { shippingAddress, billingAddress } = order
      return (
        <StoreNavView>
          <SuccessBanner />
          <Paper zDepth={1} className='row' style={styles.orderPaper}>
            <div className='large-7 columns'>
              <div className='order-success-left-container'>
                <div className='order-success-details'>
                  <h2 className='order-success-title'>
                    Your Order
                  </h2>
                  <span className='order-success-num'>
                    #{order.id}
                  </span>
                  <span className='order-success-date'>
                    3/24/2017 @ 10:31pm
                  </span>
                </div>
                <div className='order-success-shipping'>
                  <span className='order-success-heading'>
                    Shipping Address
                  </span>
                  <span className='order-success-shipping-fullname'>
                    {shippingAddress.name}
                  </span>
                  <span className='order-success-shipping-address-1'>
                    {`${shippingAddress.address}`}
                  </span>
                  <span className='order-success-shipping-address-2'>
                    {`${shippingAddress.city}, ${shippingAddress.state}
                     ${shippingAddress.zipcode}, ${shippingAddress.country}`}
                  </span>
                </div>
                <div className='order-success-payment'>
                  <span className='order-success-heading'>
                    Payment
                  </span>
                  <span className='order-success-payment-card'>
                    Visa *****4901 Expires 12/21
                  </span>
                  <span className='order-success-payment-name'>
                    {billingAddress.name}
                  </span>
                  <span className='order-success-payment-address'>
                    {`${shippingAddress.address}`}...
                  </span>
                </div>
                <div className='order-success-delivery'>
                  <span className='order-success-heading'>
                    Delivery
                  </span>
                  <span className='order-success-delivery-name'>
                    USPS Media Mail
                  </span>
                </div>
              </div>
            </div>
            <div className='large-4 large-offset-1 columns end'>
              <OrderSummary />
            </div>
          </Paper>
          <div className='bookstore-footer-container'>
            <Footer />
          </div>
        </StoreNavView>
      )
    }
    browserHistory.push('/store')
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.store.order,
  }
}

const mapDispatchToProps = {
  cleanOrderAndCart
}

export default connect(mapStateToProps, mapDispatchToProps)(orderSuccess)
