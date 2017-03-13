import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tiles } from '../../redux/actions'
import { PrimaryButton } from '../common'
import { Colors } from '../../constants/style'
import {
  Card,
  CardActions,
  CardHeader,
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

const {
  updateReadFeedLikes,
  updateReadFeedComments,
  getReadFeedComments,
} = Tiles

const styles = {
  popover: {
    borderRadius: 9,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 20px',
  },
  headerContainer: {
    padding: 30,
    textAlign: 'left',
  },
  commentHeaderContainer: {
    padding: '30px 30px 15px',
    textAlign: 'left',
  },
  card: {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 20px',
  },
  nameText: {
    color: Colors.blue,
    display: 'inline',
    fontSize: 14,
    fontWeight: 600,
  },
  postText: {
    color: Colors.black,
    display: 'inline',
    marginLeft: 6,
  },
  commentTimeStamp: {
    display: 'inline',
    marginLeft: 10,
  },
  timeStamp: {
    fontSize: 14,
    color: Colors.grey,
    position: 'absolute',
    left: 85,
    top: 53,
  },
  textContainer: {
    marginTop: -5,
  },
  contentContainer: {
    padding: '0 30px 30px 30px',
  },
  socialContainer: {
    margin: 0,
  },
  socialWrapper: {
    borderTop: `2px solid ${Colors.lightGrey}`,
    fontSize: 14,
    padding: '20px 30px',
  },
  commentContainer: {
    borderTop: `2px solid ${Colors.lightGrey}`,
    padding: 0,
  },
  likesContainer: {
    textAlign: 'left',
    padding: 0,
  },
  shareContainer: {
    textAlign: 'right',
    padding: 0,
  },
  sharePopover: {
    margin: 0,
    padding: 20,
    listStyle: 'none',
  },
  shareLink: {
    marginBottom: 10,
  },
  shareButton: {
    margin: '0 auto',
  },
  shareGoReadLink: {
    margin: 0,
  },
  commentCard: {
    boxShadow: 'none',
  },
  commentContent: {
    padding: '0 30px',
    marginLeft: 54,
    textAlign: 'left',
  },
  postButton: {
    float: 'right',
    marginRight: 35,
  },
  cardContainer: {
    borderRadius: 5,
    boxShadow: 'rgba(222, 222, 222, 0.5) 0px 4px 20px 0px',
  },
  postInput: {
    border: `1px solid ${Colors.lightMedGrey}`,
    borderRadius: 3,
    outline: 'none',
    marginLeft: 85,
    maxWidth: 450,
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
      calledCommentEndpoint: false,
      commentInput: '',
      shareInput: '',
      sharedOpen: false,
      sharePostOpen: false,
    }
  }

  componentDidMount = () => {
    this.setState({ anchorEl: this.refs.share })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { likedCount } = this.state
    const { tileId, updateReadFeedLikes } = this.props
    if (prevState.likedCount !== likedCount) updateReadFeedLikes(tileId, { liked: true })
  }

  handleLiked = () => {
    const { liked, likedCount } = this.state
    if (liked) {
      this.setState({
        liked: false,
        likedCount: likedCount - 1
      })
    } else {
      this.setState({
        liked: true,
        likedCount: likedCount + 1
      })
      this.setState({ likedCount: likedCount + 1 })
    }
  }

  handleCommentsOpen = () => {
    const {
      commentsOpen,
      sharePostOpen,
      calledCommentEndpoint
    } = this.state
    const { readFeedComments, tileId } = this.props
    if (commentsOpen) {
      if (sharePostOpen) {
        this.setState({
          sharePostOpen: false,
          commentPostOpen: true
        })
      } else {
        this.setState({
          commentsOpen: false,
          commentPostOpen: false
        })
      }
    } else {
      if (!calledCommentEndpoint && readFeedComments) {
        this.setState({ calledCommentEndpoint: this.findCommentsForThisTile() })
      }
      if (!calledCommentEndpoint) this.props.getReadFeedComments(tileId)
      this.setState({
        commentsOpen: true,
        commentPostOpen: true
      })
    }
  }

  findCommentsForThisTile = () => {
    const { tileId, readFeedComments } = this.props
    return R.prop(tileId, readFeedComments)
  }

  handleRenderComments = (allComments) => {
    const foundComments = this.findCommentsForThisTile()
    return foundComments ? foundComments.comments.map(comment => {
      return (
        <Card
          key={`${comment.profile.fullname}-${comment.id}`}
          style={styles.commentCard}
        >
          <CardHeader
            title={comment.profile.fullname}
            titleStyle={styles.nameText}
            style={styles.commentHeaderContainer}
            avatar={comment.profile.imageUrl}
            textStyle={styles.textContainer}
          >
            <p style={styles.timeStamp}> {comment.datetime} </p>
          </CardHeader>

          <CardText style={styles.commentContent}>
            {/** TODO: use renderTime method here **/}
            {comment.content}
          </CardText>
        </Card>
      )
    }) : null
  }

  handleCommentSubmit = () => {
    const {
      commented,
      commentedCount,
      commentInput
    } = this.state
    const {
      tileId,
      url,
      fullname,
      profileImage
    } = this.props
    const findDateTime = Date.now().toString().split('').slice(0, 10).join('')
    const dateTime = Number(findDateTime)
    const profile = {
      url,
      fullname,
      imageUrl: profileImage
    }
    if (!commented) this.setState({ commented: true })
    this.setState({
      commentedCount: commentedCount + 1,
      commentInput: ''
    })
    this.props.updateReadFeedComments(tileId, commentInput, dateTime, profile)
  }

  handleShareSubmit = () => {
    const { sharedCount } = this.state
    this.setState({
      sharePostOpen: false,
      commentPostOpen: true,
      sharedCount: sharedCount + 1,
      shareInput: ''
    })
  }

  handleShareOpen = () => {
    const { sharedOpen } = this.state
    sharedOpen ? this.setState({ sharedOpen: false }) : this.setState({ sharedOpen: true })
  }

  handleShareClose = () => this.setState({ sharedOpen: false })

  handleShareOpenGoRead = () => {
    const { commentsOpen, commentPostOpen, sharedOpen } = this.state
    if (!commentsOpen && sharedOpen) {
      this.setState({
        commentsOpen: true,
        sharedOpen: false
      })
    }
    if (commentPostOpen) this.setState({ commentPostOpen: false })
    this.setState({ sharePostOpen: true })
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
        <textarea
          type='text'
          className='search-input'
          placeholder='Share your thoughts'
          onChange={this.handleInputOnChange(`${inputType}`)}
          value={isComment ? commentInput : shareInput}
          rows='3'
          style={styles.postInput}
        />

        <div style={styles.postButton}>
          <PrimaryButton
            label={isComment ? 'Post' : 'Share'}
            onClick={isComment ? this.handleCommentSubmit : this.handleShareSubmit}
          />
        </div>
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
      shareInfo,
      promoted,
      action,
      readFeedComments
    } = this.props
    return (
      <div>
        <Card
          style={styles.cardContainer}
          expanded={commentsOpen}
          className='base-tile-container'
        >
          <CardHeader
            title={author.name}
            titleStyle={styles.nameText}
            subtitle={action}
            subtitleStyle={styles.postText}
            style={styles.headerContainer}
            textStyle={styles.textContainer}
            avatar={author.image}
            actAsExpander={true}
          >
            <span style={styles.timeStamp}> { promoted ? 'Promoted' : timestamp } </span>
          </CardHeader>
          <CardText style={styles.contentContainer} className='tile-main-content'>
            {this.props.children}
          </CardText>

          <CardActions style={styles.socialWrapper}>
            <div style={styles.socialContainer} className='row'>
              <div className='small-4 columns' style={styles.likesContainer}>
                <div className='likes-count'>
                  <a
                    onClick={this.handleLiked}
                    className={liked ? 'liked' : 'not-liked'}
                  />

                <span
                  className={liked ? 'liked-number' : 'not-liked-number'}
                >
                  {likedCount}
                </span>

                </div>
              </div>

              <div className='small-4 columns'>
                <div
                  className='comments-count'
                >
                  <a
                    onClick={this.handleCommentsOpen}
                    className={commented ? 'commented' : 'not-commented'}
                  />

                  <span
                    className={commented ? 'commented-number' : 'not-commented-number'}
                  >
                  {commentedCount}
                  </span>
                </div>
              </div>
              <div className='small-4 columns' style={styles.shareContainer}>
                <div className='shared-count'>
                  <a
                    onClick={this.handleShareOpen}
                  >
                  <span className='share' ref='share'>
                    Share
                  </span>
                  </a> {sharedCount}
                </div>
              </div>
            </div>
          </CardActions>
          <CardText
            className='comments-wrapper'
            expandable={true}
            style={styles.commentContainer}
          >
            <div className='comments'>
              {/** TODO: Call API endpoint to get comments.results.here**/}
              {readFeedComments ? this.handleRenderComments(readFeedComments) : null}
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
          <ul style={styles.sharePopover}>
            <li style={styles.shareLink}>
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

            <li style={styles.shareLink}>
              <TwitterShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                className='twitter-share-button'
              >
                <TwitterIcon
                  size={32}
                  round
                  style={styles.shareButton}
                />
              </TwitterShareButton>
            </li>

            <li style={styles.shareLink}>
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

            <li style={styles.shareLink}>
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
              style={styles.shareGoReadLink}
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
  timestamp: PropTypes.string,
  shared: PropTypes.object,
  likes: PropTypes.object,
  comments: PropTypes.object,
  shareInfo: PropTypes.object
}

const mapStateToProps = ({
  currentReader: {
    fullname,
    url,
    profileImage
  },
  tiles: {
    readFeedComments
  }
}) => {
  return {
    readFeedComments,
    fullname,
    url,
    profileImage
  }
}

const mapDispatchToProps = {
  updateReadFeedLikes,
  updateReadFeedComments,
  getReadFeedComments
}
export default connect(mapStateToProps, mapDispatchToProps)(TileDefault)
