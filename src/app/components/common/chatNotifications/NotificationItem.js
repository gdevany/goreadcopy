import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import moment from 'moment'

import { Notifications as NotificationActions } from '../../../redux/actions'

const { dismissNotification } = NotificationActions

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showOptions: false
    }
    this.handleDismissNotification = this.handleDismissNotification.bind(this)
    this.onDismissSingleClick = this.onDismissSingleClick.bind(this)
  }

  handleDismissNotification(e) {
    e.preventDefault()
    this.setState({
      showOptions: !this.state.showOptions,
    })
  }

  onDismissSingleClick(e, pk) {
    e.preventDefault()
    this.props.dismissNotification(pk)
    this.setState({
      showOptions: false,
    })
  }

  render() {
    const { element: {
      //category,
      //recipient,
      pk,
      actor,
      verb,
      timestamp,
      //mentions,
      //mentionArray
    } } = this.props

    return (
      <div className='single-notification-element'>
        <figure className='notification-action-figure'>
          <img src={actor.imageUrl}/>
        </figure>
        <div className='notification-container'>
          <p className='notification-description-container'>
            <a href='#' className='notification-description-anchor'>
              {actor.fullname}
              <span className='notification-description-action'>
                {verb}
              </span>
            </a>
          </p>
          <div className='notification-action-container'>
            {
              verb.toLowerCase().includes('follow') ? (
                <a
                  className='notification-action-btn'
                  href='#'
                >
                  + Follow
                </a>
              ) : null
            }
            <span className='notification-timestamp'>
              {
                timestamp ? moment(moment.unix(timestamp)).fromNow() : null
              }
            </span>
          </div>
          <div className='notifications-frame-dismiss-container'>
            <ArrowDownIcon onClick={this.handleDismissNotification}/>
            { this.state.showOptions ?
              (
                <div className='notifications-frame-dismiss-square'>
                  <a onClick={(e) => this.onDismissSingleClick(e, pk)}>Dismiss</a>
                </div>
              ) : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  dismissNotification
}

export default connect(null, mapDispatchToProps)(NotificationItem)
