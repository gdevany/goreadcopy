import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Auth } from '../../../services'
import { Store } from '../../../redux/actions'
import { BaseNavView } from '../../views'
import OrdersTable from './OrdersTable'

const isUserLoggedIn = Auth.currentUserExists()
const { getOrders } = Store

class Orders extends PureComponent {

  constructor(props) {
    super(props)
  }

  componentWillMount = () => {
    if (isUserLoggedIn) {
      this.props.getOrders()
      this.state = {
        store: {
          userOrders: null,
        },
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userOrders) {
      this.setState({
        userOrders: nextProps.userOrders
      })
    }
  }

  render() {
    const { userOrders } = this.props
    return (
      <BaseNavView>
        <div className='row orders-page'>
          <h3> Past Orders </h3>
          <div className='center-text'>
            <OrdersTable orders={userOrders} />
          </div>
        </div>
      </BaseNavView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userOrders: state.store.userOrders,
  }
}

const mapDistpachToProps = {
  getOrders,
}

export default connect(mapStateToProps, mapDistpachToProps)(Orders)
