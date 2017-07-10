import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { AnchoredParagraph, HyperLinkWrapper } from '../'
import { Colors } from '../../../constants/style'

import { Notifications as NotificationActions } from '../../../redux/actions'

const {
  dismissNotification,
  toggleShowOptions,
  toggleFollowBack,
  sendBookClubRequest
} = NotificationActions

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showFollowBack: true,
      showAcceptReject: true,
      isRequesting: false,
    }
    this.handleDismissNotification = this.handleDismissNotification.bind(this)
    this.onDismissSingleClick = this.onDismissSingleClick.bind(this)
    this.onFollowClick = this.onFollowClick.bind(this)
    this.onBookClubRequestAction = this.onBookClubRequestAction.bind(this)
  }

  handleDismissNotification(e) {
    e.preventDefault()
    const { element: { pk } } = this.props
    this.props.toggleShowOptions(pk)
  }

  onDismissSingleClick(e, pk) {
    e.preventDefault()
    this.props.dismissNotification(pk)
    this.props.toggleShowOptions(pk)
  }

  onFollowClick(e) {
    const { element: { actor: { id }, pk } } = this.props
    this.props.toggleFollowBack(id, pk)
  }

  onBookClubRequestAction(e, action) {
    const { element: { action: { memberRequestId }, pk } } = this.props
    this.props.sendBookClubRequest(action, memberRequestId, pk)
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
      pk,
      actor,
      timestamp,
      mentions,
      mentionArray,
      followBack,
      showOptions,
      showAcceptReject,
      isRequesting,
    } } = this.props

    return (
      <div className='single-notification-element'>
        <figure className='notification-action-figure'>
          <HyperLinkWrapper url={actor.url} onClick={e=>e.stopPropagation()}>
            <img src={actor.imageUrl}/>
          </HyperLinkWrapper>
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
              followBack ? (
                <a
                  className='notification-action-btn'
                  href='#'
                  onClick={this.onFollowClick}
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
          {
            showAcceptReject ? (
              <div className='notification-action-container'>
                <a
                  className='notification-action-btn'
                  href='#'
                  onClick={(e)=>{this.onBookClubRequestAction(e, 'accept')}}
                >
                  Accept
                </a>
                <a
                  className='notification-action-btn btn-red'
                  href='#'
                  onClick={(e)=>{this.onBookClubRequestAction(e, 'reject')}}
                >
                  Decline
                </a>
                {
                  isRequesting ? (
                    <RefreshIndicator
                      size={30}
                      left={0}
                      top={0}
                      loadingColor={Colors.blue}
                      status='loading'
                      style={{
                        display: 'inline-block',
                        position: 'relative',
                        marginTop: '10px'
                      }}
                    />
                  ) :
                  null
                }
              </div>
            ) : null
          }
          <div className='notifications-frame-dismiss-container'>
            <ArrowDownIcon onClick={this.handleDismissNotification}/>
            { showOptions ?
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
  dismissNotification,
  toggleShowOptions,
  toggleFollowBack,
  sendBookClubRequest,
}

const mapStateToProps = ({
  notifications: {
    results
  }
}) => {
  return {
    results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem)
