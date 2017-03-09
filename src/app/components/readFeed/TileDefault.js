import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import { PrimaryButton } from '../common'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CommentsIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ShareIcon from 'material-ui/svg-icons/social/share'
import {
  Card,
  CardActions,
  CardText,
  Popover,
} from 'material-ui'
import R from 'ramda'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')

const { updateLikes, updateComments } = Tiles

const styles = {
  popover: {
    borderRadius: 9,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 20px',
  },
}

/*
  Props needed:
  * Profile picture of person who posted the post
  * Name of person who posted the post
  * Description: (example: 'posted on her page')
  * TimeStamp: How long ago they posted
  * Likes: How many Likes this post has and if its been liked by current user
  * Comments: An object with the comment count, if current user has liked this tile
  and result props that displays each comment with user info.
 */

class TileDefault extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      liked: props.likes.likedByReader,
      likedCount: props.likes.count,
      commentsOpen: false,
      commented: props.comments.commentedByReader,
      commentedCount: props.comments.count,
      commentPostOpen: false,
      commentInput: '',
      shareInput: '',
      sharedOpen: false,
      sharePostOpen: false,
    }
  }

  componentWillMount = () => {
    //TODO: set current liked, share, and comment count
    //TODO: Set if user liked, commented, and shared on this post before?
  }

  componentDidMount = () => {
    this.setState({ anchorEl: this.refs.share })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { likedCount } = this.state
    const { tileId } = this.props
    if (prevState.likedCount !== likedCount) this.props.updateLikes(tileId, { liked: true })
  }

  handleLiked = () => {
    const { liked, likedCount } = this.state
    if (liked) {
      this.setState({ liked: false })
      this.setState({ likedCount: likedCount - 1 })
    } else {
      this.setState({ liked: true })
      this.setState({ likedCount: likedCount + 1 })
    }
  }

  handleCommentsOpen = () => {
    const { commentsOpen, sharePostOpen } = this.state
    if (commentsOpen) {
      if (sharePostOpen) {
        this.setState({ sharePostOpen: false })
        this.setState({ commentPostOpen: true })
      } else {
        this.setState({ commentsOpen: false })
        this.setState({ commentPostOpen: false })
      }
    } else {
      this.setState({ commentsOpen: true })
      this.setState({ commentPostOpen: true })
    }
  }

  handleRenderComments = (comments) => {
    return comments.map(comment => {
      return (
        <Card key={`${comment.name}-${comment.id}`}>
          <div className='comment-header-container'>
            <figure className='comment-figure-container'>
              <a href=''>
                <img className='comment-img' src={comment.authorImage}/>
              </a>
            </figure>
            <div className='comment-details-container'>
              <a href='' className='comment-author-anchor'>
                {comment.name}
              </a>
              <span className='comment-timestamp'>
                {comment.timestamp}
              </span>
            </div>
          </div>
          <CardText>
            {comment.content}
          </CardText>
        </Card>
      )
    })
  }

  handleCommentSubmit = () => {
    const { commented, commentedCount, commentInput } = this.state
    if (!commented) this.setState({ commented: true })
    this.setState({ commentedCount: commentedCount + 1 })
    this.setState({ commentInput: '' })
    // TODO: What to send over? Comment, current_reader?, comment count?
    // which post it is? anything else?
    this.props.updateComments(commentInput)
  }

  handleShareSubmit = () => {
    const { sharedCount } = this.state
    this.setState({ sharePostOpen: false })
    this.setState({ commentPostOpen: true })
    this.setState({ sharedCount: sharedCount + 1 })
    this.setState({ shareInput: '' })
  }

  handleShareOpen = () => {
    const { sharedOpen } = this.state
    sharedOpen ? this.setState({ sharedOpen: false }) : this.setState({ sharedOpen: true })
  }

  handleShareClose = () => this.setState({ sharedOpen: false })

  handleShareOpenGoRead = () => {
    const { commentsOpen, commentPostOpen, sharedOpen } = this.state
    if (!commentsOpen && sharedOpen) this.setState({ commentsOpen: true })
    if (commentPostOpen) {
      this.setState({ commentPostOpen: false })
      this.setState({ sharePostOpen: true })
    }
  }

  handleInputOnChange = R.curry((field, event) => {
    this.setState({ [field]: event.target.value })
  })

  renderPostBox = (buttonType) => {
    const { commentInput, shareInput } = this.state
    const isComment = buttonType === 'comment'
    const inputType = isComment ? 'commentInput' : 'shareInput'
    return (
      <div className='input-post-box'>
        <input
          type='text'
          className='search-input'
          placeholder='Share your thoughts'
          onChange={this.handleInputOnChange(`${inputType}`)}
          value={isComment ? commentInput : shareInput}
        />
        <PrimaryButton
          label={isComment ? 'Post' : 'Share'}
          onClick={isComment ? this.handleCommentSubmit : this.handleShareSubmit}
        />
      </div>
    )
  }

  render() {
    const {
      liked,
      likedCount,
      commentedCount,
      commented,
      commentsOpen,
      sharePostOpen,
      sharedCount,
    } = this.state

    const {
      author,
      timestamp,
      comments,
      shareInfo,
      promoted,
      action
    } = this.props

    return (
      <div>
        <Card expanded={commentsOpen} className='base-tile-container'>
          <div className='base-tile-header'>
            <figure className='tile-actor-figure'>
              <a href={author.link}>
                <img className='tile-actor-image' src={author.image} alt=''/>
              </a>
            </figure>
            <div className='tile-actor-details'>
              <div className='tile-actor-container'>
                <span className='tile-actor-name'>
                  <a href={author.link}>{author.name}</a>
                </span>
                <span className='tile-actor-action'>
                  { promoted ? null : action }
                </span>
              </div>
              <div className='tile-actor-timestamp'>
                <span>
                  { promoted ? 'Promoted' : timestamp }
                </span>
              </div>
            </div>
          </div>
          <CardText className='tile-main-content'>
            {this.props.children}
          </CardText>
          <CardActions className='base-tile-footer'>
            <div className='like-action-container'>
              <a
                className='like-anchor'
                onClick={this.handleLiked}
                className={liked ? 'liked' : 'not-liked'}
              >
              <FavoriteIcon className={liked ? 'liked' : 'not-liked'}/>
              </a>
              <span className='likes-counter'>
                {likedCount}
              </span>
            </div>
            <div className='comments-action-container'>
              <a
                onClick={this.handleCommentsOpen}
                className='comments-anchor'
              >
                <CommentsIcon className={commented ? 'commented' : 'not-commented'}/>
              </a>
              <span className='comments-counter'>
                {commentedCount}
              </span>
            </div>
            <div className='shared-count shares-action-container'>
              <a
                className='shares-anchor'
                onClick={this.handleShareOpen}
              >
              <span ref='share'>
                <ShareIcon/>
              </span>
              <span className='shares-title'>
                Share
              </span>
              </a> {sharedCount}
            </div>
          </CardActions>

          <CardText
            className='comments-wrapper'
            expandable={true}
          >
            <div className='comments'>
              {/** TODO: Call API endpoint to get comments.results.here**/}
              {this.handleRenderComments(comments.results)}
            </div>
            {
              sharePostOpen ?
                <div className='shared-post'>
                  {this.renderPostBox('share')}
                </div> :
                <div className='comments-post'>
                  {this.renderPostBox('comment')}
                </div>
            }
          </CardText>
        </Card>

        <Popover
          open={this.state.sharedOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleShareClose}
          zDepth={5}
          style={styles.popover}
        >
          <ul className='share-elements-container'>
            <li className='share-elements-item'>
              <FacebookShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                className='facebook-share-button'
              >
                <FacebookIcon
                  size={32}
                  round
                />
              </FacebookShareButton>
            </li>
            <li className='share-elements-item'>
              <TwitterShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                className='twitter-share-button'
              >
                <TwitterIcon
                  size={32}
                  round
                />
              </TwitterShareButton>
            </li>
            <li className='share-elements-item'>
              <LinkedinShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                windowWidth={750}
                windowHeight={600}
                className='linkedin-share-button'
              >
                  <LinkedinIcon
                    size={32}
                    round
                  />
              </LinkedinShareButton>
            </li>
            <li className='share-elements-item'>
              <GooglePlusShareButton
                url={shareInfo.shareLink}
                className='google-plus-share-button'
              >
                <GooglePlusIcon
                  size={32}
                  round
                />
              </GooglePlusShareButton>
            </li>
            <li
              className='share-elements-item'
              onClick={this.handleShareOpenGoRead}
            >
              GoRead
            </li>
          </ul>
        </Popover>
      </div>
    )
  }
}

TileDefault.propTypes = {
  author: PropTypes.object,
  action: PropTypes.string,
  timestamp: PropTypes.number, // Change this when we know how it'll be passed in.
  shared: PropTypes.object,
  likes: PropTypes.object,
  comments: PropTypes.object,
  shareInfo: PropTypes.object
}

const mapDispatchToProps = {
  updateLikes,
  updateComments,
}
export default connect(null, mapDispatchToProps)(TileDefault)
