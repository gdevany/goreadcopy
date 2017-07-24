import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'
import { ExternalRoutes as routes } from '../../../constants'

class OrdersTable extends PureComponent {
  constructor(props) {
    super(props)
  }

  tableData = (orders) => {
    const data = orders
    return data
  }

  tableColumns = () => {
    const columns = [{
      id: 'id',
      Header: 'Order ID',
      accessor: 'id',
      className: 'gr-link'
    }, {
      id: 'created',
      Header: 'Date Created',
      accessor: d => moment(d.created, 'YYYY-MM-DD').format('MMMM Do YYYY')
    }, {
      id: 'amount',
      Header: 'Amount',
      accessor: 'orderTotal'
    }, {
      id: 'status',
      Header: 'Status',
      accessor: 'statusName'
    }, {
      id: 'payment-method',
      Header: 'Payment Method',
      accessor: 'paymentMethod'
    }]
    return columns
  }

  render() {
    const { orders } = this.props
    const tableData = this.tableData(orders)
    const tableColumns = this.tableColumns()
    const { orderDetail } = routes
    return (
      <div>
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                const url = orderDetail({ id: rowInfo.row.id })
                console.log(url)
                window.location.assign(url)
              }
            }
          }}
          className='-highlight orders-table'
          data={tableData}
          columns={tableColumns}
          defaultPageSize={18}
          showPageJump={false}
          showPageSizeOptions={false}
          noDataText='Searching orders...'
          previousText={'< prev'}
          nextText={'next >'}
        />
      </div>
    )
  }
}

export default OrdersTable
