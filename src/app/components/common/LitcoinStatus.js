import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Litcoins } from '../../redux/actions'
import { ExternalRoutes as routes } from '../../constants'

const { litcoins } = routes

const { updateLitcoinBalance } = Litcoins

const styles = {
  container: {
    position: 'absolute',
  }
}

class LitcoinStatus extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      currentBalance: this.props.litcoinBalance,
      litcoinClass: 'invisible',
      litcoinsDifference: 0,
    }
  }

  componentWillMount = () => {
    this.props.updateLitcoinBalance()
  }

  componentWillReceiveProps = ({ litcoinBalance }) => {
    const { currentBalance, litcoinDifference } = this.state
    const checkBalance = litcoinBalance > currentBalance
    if (checkBalance) {
      this.setState({
        litcoinDifference: litcoinBalance - currentBalance
      })
      this.renderAnimation(litcoinDifference)
    }
    this.setState({
      currentBalance: litcoinBalance
    })
  }

  renderAnimation() {
    this.setState({ litcoinClass: 'fade-in' })
    setTimeout(() => {
      this.setState({ litcoinClass: 'fade-out' })
      setTimeout(() => {
        this.setState({ litcoinClass: 'invisible' })
      }, 600)
    }, 500)
  }

  render() {
    const { currentBalance, litcoinDifference } = this.state
    return (
      <div>
        <a className='rf-nav-link' href={litcoins()}>
          <span>{currentBalance ? currentBalance : null}</span>
          <img className='litcoin-img' src='/image/litcoin.png' />
        </a>
        <div style={styles.container} className={this.state.litcoinClass}>
          <a className='litcoin-balance-anchor' href={litcoins()}>
            + {litcoinDifference}
            <img className='litcoin-img' src='/image/litcoin.png' />
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    litcoinBalance: state.currentReader.litcoinBalance
  }
}

export default connect(mapStateToProps, { updateLitcoinBalance })(LitcoinStatus)
