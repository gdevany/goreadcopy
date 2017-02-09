import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { LITCOIN_TYPES as L, ONBOARDING } from '../../constants/litcoins'
import { Popover } from 'material-ui'

class Litcoins extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      litcoinClass: 'invisible',
      totalBalance: this.props.total
    }
  }

  componentDidMount = () => {
    this.setState({ anchorEl: this.refs.total })
  }

  componentWillReceiveProps = ({ selected, total }) => {
    if (total > this.state.totalBalance) {
      this.renderAnimation(selected)
    }

    this.setState({ totalBalance: total })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  renderAnimation(selected) {
    this.setState({ litcoinClass: 'fade-in' })
    setTimeout(() => {
      this.setState({ litcoinClass: 'fade-out' })
    }, 1000)
  }

  render() {
    const { selected, total } = this.props

    return (
      <div>
        <div ref='total'>
          <h3> {total} </h3>
        </div>
        {
          total === ONBOARDING[L.COMPLETE_SIGNUP_MODAL] ?
            <div>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
                zDepth={5}
              >
                <p>
                  Congrats! You just earned your first Litcoins.<br />
                  Think of Litcoins as money. <br /> <br />
                  You can earn up to 40,000 during sign up. <br />
                  Books start at just 15,000.
                </p>
              </Popover >
            </div> : null
        }
        <div className={this.state.litcoinClass}>
          <h3> + {selected} </h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  litcoins: {
    selected = 0,
    total = 0,
  }
}) => {
  return {
    selected,
    total,
  }
}

export default connect(mapStateToProps)(Litcoins)
