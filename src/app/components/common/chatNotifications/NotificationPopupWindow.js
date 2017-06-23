import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NotificationItem } from './'
import { Notifications as NotificationServices } from '../../../services/api/currentReader'
import { Notifications as NotificationActions } from '../../../redux/actions'
import CogIcon from 'material-ui/svg-icons/action/settings'
import { LoadingSpinner } from '../'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../../constants/style'

const { setReadNotifications } = NotificationServices
const {
  markNotificationsAsRead,
  dismissNotification,
  dismissAllNotifications
} = NotificationActions
const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class NotificationPopupWindow extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isDismissAllOpen: false,
      isDismissNotificationOpen: false,
      loadingDismiss: false,
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
    this.setState({ loadingDismiss: true })
    this.props.dismissAllNotifications()
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

  setLoading = () => {
    return (
      <div className='statuspost-loader'>
        <RefreshIndicator
          size={25}
          left={0}
          top={0}
          loadingColor={Colors.blue}
          status='loading'
          style={styles.refresh}
        />
      </div>
    )
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
                        { this.state.loadingDismiss ? this.setLoading() : null }
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
                <LoadingSpinner size={40} />
              ) :
            results.length === 0 ?
              (
                <div className='single-notification-element blank-state'>
                  <p> You don't have any notifications right now. </p>
                </div>
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
