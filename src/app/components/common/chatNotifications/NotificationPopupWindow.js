import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NotificationItem } from './'
import { Notifications as NotificationServices } from '../../../services/api/currentReader'
import { Notifications as NotificationActions } from '../../../redux/actions'
import { Colors } from '../../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import CogIcon from 'material-ui/svg-icons/action/settings'

const { setReadNotifications } = NotificationServices
const {
  markNotificationsAsRead,
  dismissNotification,
  dismissAllNotifications
} = NotificationActions

class NotificationPopupWindow extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isDismissAllOpen: false,
      isDismissNotificationOpen: false,
    }

    this.locals = {
      isLockedForNotifUpdate: false,
      container: null,
    }

    this.handleDismissAll = this.handleDismissAll.bind(this)
    this.onDismissAllClick = this.onDismissAllClick.bind(this)
    this.handleWheelScroll = this.handleWheelScroll.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateNotificationReadStatus()
  }

  handleDismissAll = (event) => {
    event.preventDefault()
    this.setState({
      isDismissAllOpen: !this.state.isDismissAllOpen,
    })
  }

  updateNotificationReadStatus() {
    const { isOpen, notifications: { results, unreadCount } } = this.props
    const { isLockedForNotifUpdate } = this.locals
    if (
      unreadCount && results &&
      !isLockedForNotifUpdate && isOpen
    ) {
      this.locals.isLockedForNotifUpdate = true
      setReadNotifications()
        .then(()=>{ this.props.markNotificationsAsRead() })
        .then(()=>{ this.locals.isLockedForNotifUpdate = false })
        .catch(err=>console.log(err))
    }
  }

  onDismissAllClick(e) {
    e.preventDefault()
    this.props.dismissAllNotifications()
  }

  loading() {
    return (
      <div
        className='statuspost-loader'
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '70px',
          alignItems: 'center',
        }}
      >
        <RefreshIndicator
          size={40}
          left={0}
          top={0}
          loadingColor={Colors.blue}
          status='loading'
          style={{
            display: 'inline-block',
            position: 'relative',
          }}
        />
      </div>
    )
  }

  handleWheelScroll(e) {
    if (this.locals && this.locals.container) {
      const { container } = this.locals
      const { scrollHeight, scrollTop, clientHeight } = container
      const { deltaY } = e

      if (scrollTop + deltaY < 0) {
        e.preventDefault()
        return false
      }
      if (scrollTop + deltaY + clientHeight > scrollHeight) {
        e.preventDefault()
        return false
      }
    }
    return true
  }

  render() {
    const { isOpen, notifications: { results } } = this.props
    return isOpen ? (
      <section className='notifications-main-frame-container'>
        <section
          className='notifications-frame-container'
          onWheel={e=>{this.handleWheelScroll(e)}}
          ref={cont=>{this.locals.container = cont}}
        >
          {
            results && results.length > 0 ?
              (
                <div className='notifications-frame-dismissall-container'>
                  <CogIcon onClick={this.handleDismissAll}/>
                  {this.state.isDismissAllOpen ?
                    (
                      <div className='notifications-frame-dismissall-square'>
                        <a onClick={this.onDismissAllClick}>Dismiss all</a>
                      </div>
                    ) : null
                  }
                </div>
              ) :
              null
          }
          {
            !results ?
              (
                this.loading()
              ) :
            results.length === 0 ?
              (
                <p> No notifications to list! </p>
              ) :
            results.map((el, idx)=><NotificationItem key={idx} element={el}/>)
          }
        </section>
      </section>
    ) : null
  }

}

const mapStateToProps = ({
  notifications
}) => {
  return {
    notifications
  }
}

const mapDispathToProps = {
  markNotificationsAsRead,
  dismissNotification,
  dismissAllNotifications,
}

export default connect(mapStateToProps, mapDispathToProps)(NotificationPopupWindow)
