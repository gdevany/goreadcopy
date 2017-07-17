import React, { PureComponent } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'

class OrdersTable extends PureComponent {
  constructor(props) {
    super(props)
  }

  tableData = (orders) => {
    console.log(moment)
    const data = orders
    return data
  }

  tableColumns = () => {
    const columns = [{
      id: 'id',
      Header: 'Order ID',
      accessor: 'id' // String-based value accessors!
    }, {
      id: 'created',
      Header: 'Date Created',
      accessor: 'created',
      Cell: props => {moment(props.created, 'YYYY-MM-DD').format('MMMM Do YYYY')},
    }, {
      id: 'amount', // Required because our accessor is not a string
      Header: 'Amount',
      accessor: 'orderTotal' // Custom value accessors!
    }, {
      id: 'status', // Required because our accessor is not a string
      Header: 'Status',
      accessor: 'statusName'
    }]
    return columns
  }

  render() {
    const { orders } = this.props
    const tableData = this.tableData(orders)
    const tableColumns = this.tableColumns()
    return (
      <div>
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                console.log('It was in this row:', rowInfo.row)
              }
            }
          }}
          className='-striped -highlight'
          data={tableData}
          columns={tableColumns}
        />
      </div>
    )
  }
}

export default OrdersTable
