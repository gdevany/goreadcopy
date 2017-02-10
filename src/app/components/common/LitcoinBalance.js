import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Litcoins } from '../../redux/actions'
import { LITCOIN_TYPES as L, ONBOARDING } from '../../constants/litcoins'
import { Popover } from 'material-ui'
import Auth from '../../services/auth'

const { updateLitcoinBalance } = Litcoins

class LitcoinBalance extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      litcoinClass: 'invisible',
      totalBalance: this.props.total,
      signUpEmailCheck: false,
    }
  }

  componentDidMount = () => {
    this.setState({ anchorEl: this.refs.total })
    this.props.updateLitcoinBalance()
  }

  componentWillReceiveProps = ({ selected, total, email, selectAll }) => {
    const { signUpEmailCheck, totalBalance } = this.state
    const checkBalance = total > totalBalance

    if (signUpEmailCheck && !selectAll) {
      if (checkBalance) this.renderAnimation(selected)
    } else {
      if (!email && Auth.currentUserExists() && (total === L.CREATED_ACCOUNT_SOCIAL)) {
        this.setState({ open: true })
      }
      if (email && checkBalance && !selectAll) this.renderAnimation(selected)
      if (!signUpEmailCheck) this.setState({ signUpEmailCheck: true })
    }

    this.setState({ totalBalance: total })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
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
    const { selected, total } = this.props
    const shouldRenderPopover = (total === ONBOARDING[L.COMPLETE_SIGNUP_MODAL]) ||
      this.state.signUpEmailCheck

    return (
      <div>
        <div ref='total'>
          <h3> {total} </h3>
        </div>
        {
          shouldRenderPopover ?
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
                  You can earn up to 30,000 during sign up. <br />
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
  },
  readerData: {
    email = undefined
  },
}) => {
  return {
    selected,
    total,
    email,
  }
}

export default connect(mapStateToProps, { updateLitcoinBalance })(LitcoinBalance)
