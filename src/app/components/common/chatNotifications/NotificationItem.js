import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import moment from 'moment'
import { AnchoredParagraph } from '../'

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

  mapMentions(list) {
    return list.map(item=>{
      return {
        pattern: item.mentions,
        url: item.url,
        text: item.name,
      }
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
      mentions,
      mentionArray
    } } = this.props

    return (
      <div className='single-notification-element'>
        <figure className='notification-action-figure'>
          <img src={actor.imageUrl}/>
        </figure>
        <div className='notification-container'>
          <AnchoredParagraph
            text={mentions}
            regexpr={/(\@\[\d+\:\d+\])/}
            replace={this.mapMentions(mentionArray)}
            cls={{
              a: 'notification-description-anchor',
              p: 'notification-description-container',
              span: 'notification-description-action'
            }}
          />
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
                timestamp ?
                  moment(moment.unix(timestamp)).fromNow() :
                  null
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
