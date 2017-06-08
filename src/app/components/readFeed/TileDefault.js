import React, { PureComponent, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import { Tiles } from '../../redux/actions'
import { PrimaryButton } from '../common'
import { RegisterSignInModal } from '../common'
import { Colors } from '../../constants/style'
import { Auth } from '../../services'
import { Search } from '../../services/api'
import SuggestionList from '../common/SuggestionList'
import Anchorify from 'react-anchorify-text'
import {
  Card,
  CardActions,
  CardText,
  Popover,
} from 'material-ui'
import R from 'ramda'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'
import moment from 'moment'
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons

const isUserLoggedIn = Auth.currentUserExists()
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const { search } = Search
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi
const mentionRegex = /(\@\[\d+\:\d+\])/gi

const {
  updateLikes,
  updateComments,
  getComments,
  shareTile,
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
    marginRight: 0,
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
    paddingRight: 40,
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
  commentIconContainer: {
    textAlign: 'center',
  },
  commentContainer: {
    borderTop: `2px solid ${Colors.lightGrey}`,
    padding: 0,
  },
  commentActions: {
    borderBottom: `2px solid ${Colors.lightGrey}`,
    fontSize: 14,
    padding: '10px 20px',
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
    textAlign: 'justify',
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
  childCommentContainer: {
    marginLeft: 40,
  },
  childCommentActionContainer: {
    textAlign: 'right',
    padding: '0px 10px',
  },
  childCommentHeaderContainer: {
    padding: '20px 20px 15px',
    textAlign: 'left',
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
      sharedCount: props.shareInfo.sharesCount,
      shareInput: '',
      sharedOpen: false,
      sharePostOpen: false,
      commentParentId: false,
      replyPlaceholder: false,
      modalLogInOpen: false,
      userLogged: false,
      body: '',
      mentions: '',
      suggestions: [],
      onProcessMentions: [],
      processedMentions: [],
      showSuggestions: false,
      isTextComment: false,
    }

    this.handleLogInModalClose = this.handleLogInModalClose.bind(this)
    this.checkMentions = this.checkMentions.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.refreshMentions = this.refreshMentions.bind(this)
    this.getMentions = debounce(this.getMentions, 250)
    this.replaceMention = this.replaceMention.bind(this)
  }

  renderTime = (time) => {
    if (moment(moment.unix(time)).isValid()) {
      return moment(moment.unix(time)).fromNow()
    }
    return time
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderAction = (entry, index, target) => {
    const targetUrlRegex = /\{(\w.*)\}/
    if (targetUrlRegex.test(entry)) {
      const match = targetUrlRegex.exec(entry)
      if (match) {
        const matchIndex = 1
        const targetName = match[matchIndex]
        return (
          <a className='tile-target-name' key={index} href={target.link}>
            {this.truncInfo(targetName, 33)}
          </a>
        )
      }
      return (
        <span className='margin-right' key={index}>
          {entry}
        </span>)
    }
    return (
      <span className='margin-right' key={index}>
        {entry}
      </span>)
  }

  componentDidMount = () => {
    this.setState({
      anchorEl: this.refs.share,
      userLogged: isUserLoggedIn,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.token) {
      this.setState({
        userLogged: true,
      })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { likedCount } = this.state
    const { tileId, updateLikes } = this.props
    if (prevState.likedCount !== likedCount) updateLikes(tileId, { liked: true })
  }

  handleLogInModalClose = () => {
    this.setState({ modalLogInOpen: false })
  }

  handleLogInModalOpen = (event) => {
    event.preventDefault()
    this.setState({ modalLogInOpen: true })
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
      calledCommentEndpoint,
    } = this.state
    const {
      feedComments,
      tileId,
      getComments,
    } = this.props

    if (commentsOpen) {
      if (sharePostOpen) {
        this.setState({
          sharePostOpen: false,
          commentPostOpen: true,
          isTextComment: true,
        })
      } else {
        this.setState({
          commentsOpen: false,
          commentPostOpen: false,
          commentParentId: false,
        })
      }
    } else {
      if (!calledCommentEndpoint) {
        if (feedComments) {
          this.setState({ calledCommentEndpoint: this.findCommentsForThisTile(feedComments) })
        }
        getComments(tileId)
      }
      this.setState({
        commentsOpen: true,
        commentPostOpen: true,
        isTextComment: true,
      })
    }
  }

  findCommentsForThisTile = (comments) => {
    const { tileId } = this.props
    return R.prop(tileId, comments)
  }

  handleRenderChildComments = (childComments) => {
    return childComments ? childComments.map(comment => {
      return (
        <Card
          key={`${comment.id}`}
          style={styles.commentCard}
        >
          <div className='base-tile-header'>
            <figure className='tile-actor-figure'>
              <a href={comment.profile.url}>
                <img className='tile-actor-image' src={comment.profile.imageUrl} alt=''/>
              </a>
            </figure>
            <div className='tile-actor-details'>
              <div className='tile-actor-container'>
                <span className='tile-actor-name'>
                  <a href={comment.profile.url}>
                    {comment.profile.fullname}
                  </a>
                </span>
              </div>
              <div className='tile-actor-timestamp'>
                <span>
                  {this.renderTime(comment.datetime)}
                </span>
              </div>
            </div>
          </div>
          <CardText style={styles.commentContent}>
            {comment.comment}
          </CardText>
          <CardActions style={styles.commentActions}>
            <div style={styles.socialContainer} className='row'>
              <div style={styles.childCommentActionContainer}>
                  <a
                    onClick={() => { this.handleReplyComment(comment.id) }}
                    className='reply'
                  >
                    <ReplyIcon />
                    Reply
                  </a>
              </div>
            </div>
          </CardActions>
          <div className='child-comments' style={styles.childCommentContainer}>
            {comment.children ? this.handleRenderChildComments(comment.children) : null}
          </div>
        </Card>
      )
    }) : null
  }

  handleRenderComments = (allComments) => {
    const { feedComments } = this.props
    const foundComments = this.findCommentsForThisTile(feedComments)
    return foundComments ? foundComments.comments.map(comment => {
      const splittedContent = this.splitContent(comment.mentions)
      return (
        <Card
          key={`${comment.id}`}
          style={styles.commentCard}
        >
          <div className='base-tile-header'>
            <figure className='tile-actor-figure'>
              <a href={comment.profile.url}>
                <img className='tile-actor-image' src={comment.profile.imageUrl} alt=''/>
              </a>
            </figure>
            <div className='tile-actor-details'>
              <div className='tile-actor-container'>
                <span className='tile-actor-name'>
                  <a href={comment.profile.url}>
                    {comment.profile.fullname}
                  </a>
                </span>
              </div>
              <div className='tile-actor-timestamp'>
                <span>
                  {this.renderTime(comment.datetime)}
                </span>
              </div>
            </div>
          </div>
          <CardText style={styles.commentContent} className='commentContent'>
            {
              splittedContent.map((entry, index) => {
                return this.renderContentWithMentions(entry, index, comment.mentionArray)
              })
            }
          </CardText>
          <CardActions style={styles.commentActions}>
            <div style={styles.socialContainer} className='row'>
              <div style={styles.childCommentActionContainer}>
                  <a
                    onClick={() => { this.handleReplyComment(comment.id) }}
                    className='reply'
                  >
                    <ReplyIcon />
                    Reply
                  </a>
              </div>
            </div>
          </CardActions>
          <div className='child-comments' style={styles.childCommentContainer}>
            {comment.children ? this.handleRenderChildComments(comment.children) : null}
          </div>
        </Card>
      )
    }) : null
  }

  renderContentWithMentions(entry, index, mentionList) {
    if (mentionRegex.test(entry)) {
      for (let i = 0; i < mentionList.length; i++) {
        if (mentionList[i].mention === entry) {
          const splitResult = this.splitMention(mentionList[i].url)
          if (splitResult && splitResult[3] === 'profile') {
            return (
              <Link key={index} to={`profile/${splitResult[splitResult.length - 2]}`}>
                {mentionList[i].name}
              </Link>
            )
          }
          return (
            <a key={index} href={mentionList[i].url}>
              {mentionList[i].name}
            </a>
          )
        }
      }
    }
    return (
      <span key={index}>
        <Anchorify
          text={entry}
          target='_blank'
        />
      </span>)
  }

  splitContent(content) {
    return content.split(mentionRegex)
  }

  splitMention(content) {
    return content.split('/')
  }

  handleReplyComment = (tileId) => {
    this.setState({
      commentParentId: tileId,
      replyPlaceholder: 'Post your Reply here'

    })
    this.handleCommentsOpen
  }

  handleCommentSubmit = () => {
    const {
      commented,
      commentedCount,
      commentInput,
      commentParentId,
      mentions,
    } = this.state
    const {
      tileId,
      url,
      fullname,
      profileImage,
      updateComments
    } = this.props
    const findDateTime = Date.now().toString().split('').slice(0, 10).join('')
    const datetime = Number(findDateTime)
    const profile = {
      url,
      fullname,
      imageUrl: profileImage
    }
    if (!commented) this.setState({ commented: true })
    this.setState({
      commentedCount: commentedCount + 1,
      commentInput: '',
      replyPlaceholder: false
    })
    updateComments(tileId, commentInput, commentParentId, mentions, datetime, profile)
  }

  handleShareSubmit = (shareType) => {
    const {
      sharedCount,
      shareInput,
      mentions
    } = this.state
    const {
      tileId,
      shareTile
    } = this.props
    this.handleShareClose
    if (shareType === 5) {
      this.setState({
        sharePostOpen: false,
        sharedOpen: false,
        sharedCount: sharedCount + 1,
        shareInput: '',
        commentsOpen: false,
        commentPostOpen: false,
      })
      shareTile(tileId, shareType, shareInput, mentions)
    } else {
      this.setState({
        sharedOpen: false,
        sharedCount: sharedCount + 1,
      })
      shareTile(tileId, shareType, null, null)
    }
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
      })
    }
    if (commentPostOpen) this.setState({ commentPostOpen: false })
    this.setState({
      sharePostOpen: true,
      isTextComment: false,
      sharedOpen: false,
    })
  }

  handleInputOnChange = R.curry((field, event) => {
    const commentInput = event.target.value
    const { showSuggestions, onProcessMentions } = this.checkMentions(commentInput)
    const {
      processedMentions,
      mentions
    } = this.refreshMentions(commentInput, this.state.processedMentions)
    this.setState({
      [field]: event.target.value,
      commentInput,
      mentions,
      showSuggestions,
      onProcessMentions,
      processedMentions,
    })
  })

  checkMentions(latestBody) {
    const result = {
      showSuggestions: false,
      onProcessMentions: latestBody.match(mentionPattern) || ''
    }
    console.log(result.onProcessMentions)
    if (result.onProcessMentions && result.onProcessMentions.length > 0) {
      this.getMentions(R.last(result.onProcessMentions).replace('@', ''))
    }
    return result
  }

  getMentions(query) {
    console.log('fetching mentions')
    console.log(query)
    if (query) {
      search({
        author: query,
        reader: query,
        book: query,
        publisher: query
      }).then((res) => this.setState({
        suggestions: res.data,
        showSuggestions: true
      }))
    } else {
      this.setState({ showSuggestions: false })
    }
  }

  refreshMentions(updatedBody, updatedProcessedMentions) {
    let processedMentions = R.clone(updatedProcessedMentions)
    let mentions = updatedBody
    // Beware of indexOf 0 in the next line
    processedMentions = processedMentions.filter((el) => mentions.indexOf(el.display) >= 0)
    processedMentions.map(function (el) {
      mentions = mentions.replace(el.display, el.mention)
    })
    return {
      processedMentions,
      mentions
    }
  }

  handleSuggestionClick(event) {
    event.stopPropagation()
    const { type, display, contenttype, id } = event.target.dataset
    const textInput = this.replaceMention(type, display, contenttype, id)
    const { showSuggestions, onProcessMentions } = this.checkMentions(textInput)
    const { processedMentions, mentions } = this.refreshMentions(textInput, R.concat(
      this.state.processedMentions,
      [{
        display: `@${type}:${display}`,
        mention: `@[${contenttype}:${id}]`
      }]
    ))
    this.setState({
      commentInput: textInput,
      shareInput: textInput,
      mentions,
      processedMentions,
      showSuggestions,
      onProcessMentions,
    })
    this.postInput.focus()
  }

  replaceMention(type, display, contentType, id) {
    const { commentInput, onProcessMentions } = this.state
    const lastMention = R.last(onProcessMentions)
    const updatedBody = commentInput.replace(lastMention, `@${type}:${display} `)
    return updatedBody
  }

  renderPostBox = (buttonType) => {
    const {
      commentInput,
      shareInput,
      commentParentId,
      replyPlaceholder,
    } = this.state
    const { profileImage } = this.props
    const isComment = buttonType === 'comment'
    const inputType = isComment ? 'commentInput' : 'shareInput'
    return (
      <div className='input-post-box comments-tile-container'>
        <div className='comments-elelemnts'>
          <img className='comments-image' src={profileImage} />
          {
            isComment && commentParentId ?
              <input
                type='hidden'
                value={commentParentId}
                name='parentId'
              /> :
              null
          }
          <textarea
            type='text'
            ref={(input) => {this.postInput = input}}
            className='search-input comments-textarea'
            placeholder={replyPlaceholder ? replyPlaceholder : 'Share your thoughts'}
            onChange={this.handleInputOnChange(`${inputType}`)}
            value={isComment ? commentInput : shareInput}
            rows='3'
            autoFocus
          />
          {this.state.showSuggestions ?
            (<SuggestionList
              entries={this.state.suggestions}
              onMentionListClick={this.handleSuggestionClick}
             />
            ) : null
          }
        </div>
        <div>
          <PrimaryButton
            label={isComment ? 'Post' : 'Share'}
            onClick={isComment ? this.handleCommentSubmit : () => this.handleShareSubmit(5)}
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
      isTextComment,
    } = this.state

    const {
      author,
      target,
      timestamp,
      shareInfo,
      promoted,
      action,
      feedComments,
    } = this.props
    const splitActionrRegex = /(?:[^\s{]+|{[^{]*})+/g
    const splittedAction = action ? action.match(splitActionrRegex) : null
    return (
      <div>
        <Card
          style={styles.cardContainer}
          expanded={commentsOpen}
          className='base-tile-container'
        >
          <div className='base-tile-header'>
            <figure className='tile-actor-figure'>
              <a href={author.link}>
                <img className='tile-actor-image' src={author.image} alt=''/>
              </a>
            </figure>
            <div className='tile-actor-details'>
              <div className='tile-actor-container'>
                <p>
                  <span className='tile-actor-name margin-right'>
                    <a href={author.link}>
                      {author.name}
                    </a>
                  </span>
                  <span className='tile-actor-action'>
                    {
                      promoted ?
                        null : splittedAction ?
                          splittedAction.map((entry, index) => {
                            return this.renderAction(entry, index, target)
                          }) : action
                    }
                  </span>
                </p>
              </div>
              <div className='tile-actor-timestamp'>
                <span>
                  { promoted ? 'Promoted' : timestamp }
                </span>
              </div>
            </div>
          </div>
          <CardText style={styles.contentContainer} className='tile-main-content'>
            {this.props.children}
          </CardText>

          <CardActions style={styles.socialWrapper}>
            <div style={styles.socialContainer} className='row'>
              <div className='small-4 columns' style={styles.likesContainer}>
                <div className='likes-count'>
                  <a
                    onClick={this.state.userLogged ? this.handleLiked : this.handleLogInModalOpen}
                    className={liked ? 'liked' : 'not-liked'}
                  />

                <span
                  className={liked ? 'liked-number' : 'not-liked-number'}
                >
                  {likedCount}
                </span>

                </div>
              </div>
              <div className='small-4 columns' style={styles.commentIconContainer}>
                <div className='comments-count'>
                  <a
                    onClick={
                      this.state.userLogged ?
                        this.handleCommentsOpen : this.handleLogInModalOpen
                      }
                    className={commented ? 'commented' : 'not-commented'}
                  />
                  <span className={commented ? 'commented-number' : 'not-commented-number'}>
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
                    Share {sharedCount}
                  </span>
                  </a>
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
              {isTextComment && feedComments ? this.handleRenderComments(feedComments) : null}
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
          <RegisterSignInModal
            modalOpen={this.state.modalLogInOpen}
            handleClose={this.handleLogInModalClose}
          />
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
            <li
              style={styles.shareLink}
              onClick={() => this.handleShareSubmit(1)}
            >
              <FacebookShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                description={action}
                className='facebook-share-button pointer-hand'
              >
                <FacebookIcon
                  size={32}
                  round
                />
              </FacebookShareButton>
            </li>

            <li
              style={styles.shareLink}
              onClick={() => this.handleShareSubmit(2)}
            >
              <TwitterShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                className='twitter-share-button pointer-hand'
              >
                <TwitterIcon
                  size={32}
                  round
                  style={styles.shareButton}
                />
              </TwitterShareButton>
            </li>

            <li
              style={styles.shareLink}
              onClick={() => this.handleShareSubmit(4)}
            >
              <LinkedinShareButton
                url={shareInfo.shareLink}
                title={shareInfo.title}
                windowWidth={750}
                windowHeight={600}
                description={action}
                className='linkedin-share-button pointer-hand'
              >
                  <LinkedinIcon
                    size={32}
                    round
                  />
              </LinkedinShareButton>
            </li>

            <li
              style={styles.shareLink}
              onClick={() => this.handleShareSubmit(3)}
            >
              <GooglePlusShareButton
                url={shareInfo.shareLink}
                className='google-plus-share-button pointer-hand'
              >
                <GooglePlusIcon
                  size={32}
                  round
                />
              </GooglePlusShareButton>
            </li>

            {this.state.userLogged ?
              (
                <li
                  style={styles.shareGoReadLink}
                  onClick={this.handleShareOpenGoRead}
                >
                <img
                  className='logo-share-img pointer-hand'
                  src='/image/logo_share.png'
                />
                </li>
              ) : null
            }
          </ul>
        </Popover>
      </div>
    )
  }
}

TileDefault.propTypes = {
  author: PropTypes.object,
  target: PropTypes.object,
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
    profileImage,
    token,
  },
  tiles: {
    feedComments
  }
}) => {
  return {
    feedComments,
    fullname,
    url,
    profileImage,
    token
  }
}

const mapDispatchToProps = {
  updateLikes,
  updateComments,
  getComments,
  shareTile
}
export default connect(mapStateToProps, mapDispatchToProps)(TileDefault)
