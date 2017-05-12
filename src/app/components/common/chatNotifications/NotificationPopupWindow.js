import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Notifications } from '../../../redux/actions'
import moment from 'moment'

const { loadNotifications } = Notifications

class NotificationPopupWindow extends PureComponent {
  componentDidMount() {
    this.props.loadNotifications()
  }

  drawNotification(el, idx) {
    const {
      //category,
      //recipient,
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
        </div>
      </div>
    )
  }

  render() {
    const { results } = this.props.notifications
    return (
      <section className='notifications-main-frame-container'>
        <section className='notifications-frame-container'>
          {
            results && results.length > 0 ?
              results.map(this.drawNotification) :
              null
          }
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
        </section>
      </section>
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

const mapDispatchToProps = {
  loadNotifications,
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPopupWindow)
