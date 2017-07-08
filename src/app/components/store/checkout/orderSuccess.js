import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { BookStoreNavBar, Footer } from '../../common'
import { SuccessBanner, OrderSummary, CartItems } from './'

const styles = {
  orderPaper: {
    marginBottom: 25,
    padding: '1em',
  },
}

class orderSuccess extends PureComponent {
  render() {
    return (
      <div>
        <BookStoreNavBar />
        <SuccessBanner />
        <Paper zDepth={1} className='row' style={styles.orderPaper}>
          <div className='large-7 columns'>
            <CartItems />
          </div>
          <div className='large-4 large-offset-1 columns end'>
            <OrderSummary />
          </div>
        </Paper>
        <div className='bookstore-footer-container'>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.store.order,
  }
}

export default connect(mapStateToProps, null)(orderSuccess)
