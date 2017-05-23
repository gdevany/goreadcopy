import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import moment from 'moment'
import { AnchoredParagraph } from '../'
import currentReaderRecommendation from '../../../services/api/currentReader/recommendation'
import { BookClubs } from '../../../services/api/'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Colors } from '../../../constants/style'

import { Notifications as NotificationActions } from '../../../redux/actions'

const { dismissNotification } = NotificationActions

class NotificationItem extends PureComponent {
  constructor(props) {
    const { element: { verb, followBack, category } } = props
    super(props)
    this.state = {
      showOptions: false,
      showFollowBack: verb.toLowerCase().includes('follow') && followBack,
      showAcceptReject: category === 'book_club_member_request',
      isRequesting: false,
    }
    this.handleDismissNotification = this.handleDismissNotification.bind(this)
    this.onDismissSingleClick = this.onDismissSingleClick.bind(this)
    this.onFollowClick = this.onFollowClick.bind(this)
    this.onBookClubRequestAction = this.onBookClubRequestAction.bind(this)
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

  onFollowClick(e) {
    const { element: { actor: { id } } } = this.props
    currentReaderRecommendation.likedReaders({ 'readerIds': [id] })
      .then(res=>{ this.setState({ showFollowBack: false }) })
      .catch(err=>console.log(err))
  }

  onBookClubRequestAction(e, action) {
    const { element: { action: { memberRequestId } } } = this.props
    this.setState({ isRequesting: true })
    BookClubs.membershipRequest({ 'action': action, 'id': memberRequestId })
      .then(res=>{
        this.setState({ isRequesting: false, showAcceptReject: false })
      })
      .catch(err=>{
        this.setState({ isRequesting: false })
        console.log(err)
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
      pk,
      actor,
      timestamp,
      mentions,
      mentionArray,
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
              this.state.showFollowBack ? (
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
            this.state.showAcceptReject ? (
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
                  this.state.isRequesting ? (
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
