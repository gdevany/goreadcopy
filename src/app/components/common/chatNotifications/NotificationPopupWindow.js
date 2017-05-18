import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Notifications as NotificationServices } from '../../../services/api/currentReader'
import { Notifications as NotificationActions } from '../../../redux/actions'
import moment from 'moment'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../../constants/style'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

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
    }

    this.drawNotification = this.drawNotification.bind(this)
    this.handleDismissAll = this.handleDismissAll.bind(this)
    this.handleDismissNotification = this.handleDismissNotification.bind(this)
    this.onDismissAllClick = this.onDismissAllClick.bind(this)
    this.onDismissSingleClick = this.onDismissSingleClick.bind(this)
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

  handleDismissNotification = (event) => {
    event.preventDefault()
    this.setState({
      isDismissNotificationOpen: !this.state.isDismissNotificationOpen,
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

  onDismissSingleClick(e, pk) {
    e.preventDefault()
    this.props.dismissNotification(pk)
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

  drawNotification(el, idx) {
    const {
      //category,
      //recipient,
      pk,
      actor,
      verb,
      timestamp,
      //mentions,
      //mentionArray
    } = el
    return (
      <div key={idx} className='single-notification-element'>
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
            { this.state.isDismissNotificationOpen ?
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

  render() {
    const { isOpen, notifications: { results } } = this.props
    return isOpen ? (
      <section className='notifications-main-frame-container'>
        <section className='notifications-frame-container'>
          {
            results && results.length > 0 ?
              (
                <div className='notifications-frame-dismissall-container'>
                  <ArrowDownIcon onClick={this.handleDismissAll}/>
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
            results.map(this.drawNotification)
          }
        </section>
      </section>
    ) : null
  }

  renderExamples() {
    return (
      <div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Johny Tsinami
                <span className='notification-description-action'>
                  started following you
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <a
                className='notification-action-btn'
                href='#'
              >
                + Follow
              </a>
              <span className='notification-timestamp'>
                23m
              </span>
            </div>
          </div>
        </div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Jaime Stevens
                <span className='notification-description-action'>
                  Liked your comment: I agree this is certainly a very, very swagalic...
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <span className='liked-action'/>
              <span className='notification-timestamp'>
                1 hour
              </span>
            </div>
          </div>
        </div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Jessica Ramos
                <span className='notification-description-action'>
                  Replied to your comment: This book has vas amounts of swaf
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <span className='commented-action'/>
              <span className='notification-timestamp'>
                8 hours
              </span>
            </div>
          </div>
        </div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Scott Hurff
                <span className='notification-description-action'>
                  Mentioned you in a Post
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <span className='commented-action'/>
              <span className='notification-timestamp'>
                1 day
              </span>
            </div>
          </div>
        </div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container notification-has-figure'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Scott Hurff
                <span className='notification-description-action'>
                  Liked your photo
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <span className='liked-action'/>
              <span className='notification-timestamp'>
                6 days
              </span>
            </div>
          </div>
          <figure className='liked-image-figure'>
            <img src='/image/community.jpg'/>
          </figure>
        </div>
        <div className='single-notification-element'>
          <figure className='notification-action-figure'>
            <img src='/image/kendunn.jpg'/>
          </figure>
          <div className='notification-container notification-has-figure'>
            <p className='notification-description-container'>
              <a href='#' className='notification-description-anchor'>
                Scott Hurff
                <span className='notification-description-action'>
                  Liked your photo
                </span>
              </a>
            </p>
            <div className='notification-action-container'>
              <span className='liked-action'/>
              <span className='notification-timestamp'>
                6 days
              </span>
            </div>
          </div>
          <figure className='liked-image-figure'>
            <img src='/image/community.jpg'/>
          </figure>
        </div>
      </div>
    )
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
