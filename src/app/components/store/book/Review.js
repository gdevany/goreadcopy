import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import { Tiles } from '../../../redux/actions'
import { PrimaryButton } from '../../common'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import R from 'ramda'
import moment from 'moment'
import {
  Card,
  CardActions,
  CardText,
} from 'material-ui'
const {
  updateLikes,
  updateComments,
  getComments,
} = Tiles

const styles = {
  cardContainer: {
    boxShadow: 'none',
    width: '100%',
  },
  commentCard: {
    boxShadow: 'none',
  },
  commentContent: {
    padding: '0 30px',
    marginLeft: 54,
    textAlign: 'justify',
  },
}

class Review extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      liked: props.rateInfo.likedByReader,
      likedCount: props.rateInfo.likes ? props.rateInfo.likes.count : 0,
      commented: props.rateInfo.commentedByReader,
      commentsCount: props.rateInfo.comments ? props.rateInfo.comments.count : 0,
      commentInput: '',
      calledCommentEndpoint: false,
      commentParentId: false,
      replyPlaceholder: false,
      rateInfo: props.rateInfo,
      commentsOpen: false,
    }
  }

  // componentWillReceiveProps = (nextProps) => {
  //   if (nextProps.rateInfo !== this.props.rateInfo) {
  //     console.log(nextProps.rateInfo)
  //     this.setState({ rateInfo: nextProps.rateInfo })
  //   }
  // }
  componentDidUpdate = (prevProps, prevState) => {
    const { likedCount, rateInfo } = this.state
    const { updateLikes } = this.props
    if (prevState.likedCount !== likedCount) updateLikes(rateInfo.id, { liked: true })
  }

  renderTime = (time) => {
    if (moment(moment.unix(time)).isValid()) {
      return moment(moment.unix(time)).format('MMMM DD, YYYY')
    }
    return time
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
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

  handleReplyComment = (tileId) => {
    this.setState({
      commentParentId: tileId,
      replyPlaceholder: 'Post your Reply here'

    })
    this.handleCommentsOpen
  }

  handleCommentsOpen = () => {
    const { commentsOpen, calledCommentEndpoint, rateInfo } = this.state
    const { getComments } = this.props
    if (commentsOpen) {
      this.setState({
        commentsOpen: false,
      })
    } else {
      if (!calledCommentEndpoint) {
        if (rateInfo.comments && rateInfo.comments.count > 0) {
          getComments(rateInfo.id)
          this.setState({ calledCommentEndpoint: true })
        }
      }
      this.setState({
        commentsOpen: true,
      })
    }
  }

  findCommentsForThisTile = (comments) => {
    const { rateInfo } = this.state
    return R.prop(rateInfo.id, comments)
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

  handleCommentSubmit = () => {
    const {
      commented,
      commentesCount,
      commentInput,
      commentParentId,
      rateInfo,
    } = this.state
    const {
      currentReader,
      updateComments
    } = this.props
    const findDateTime = Date.now().toString().split('').slice(0, 10).join('')
    const datetime = Number(findDateTime)
    const profile = {
      url: currentReader.url,
      fullname: currentReader.fullname,
      imageUrl: currentReader.imageUrl
    }
    if (!commented) this.setState({ commented: true })
    this.setState({
      commentesCount: commentesCount + 1,
      commentInput: '',
      replyPlaceholder: false
    })
    updateComments(rateInfo.id, commentInput, commentParentId, datetime, profile)
  }

  handleInputOnChange = R.curry((field, event) => {
    this.setState({ [field]: event.target.value })
  })

  renderPostBox = () => {
    const { currentReader } = this.props
    const { commentInput, commentParentId, replyPlaceholder } = this.state
    return (
      <div className='input-post-box comments-tile-container'>
        <div className='comments-elelemnts'>
          <img className='comments-image' src={currentReader.imageUrl} />
          {
            commentParentId ?
              <input
                type='hidden'
                value={commentParentId}
                name='parentId'
              /> :
              null
          }
          <textarea
            type='text'
            className='search-input comments-textarea'
            placeholder={replyPlaceholder ? replyPlaceholder : 'Share your thoughts'}
            rows='3'
            onChange={this.handleInputOnChange('commentInput')}
            value={commentInput}
          />
        </div>
        <div className='center-text'>
          <PrimaryButton
            label='Post'
            onClick={this.handleCommentSubmit}
          />
        </div>
      </div>
    )
  }
  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='review-rating-icon' src='/image/star-rating.png' />}
        empty={<img className='review-rating-icon' src='/image/star-empty.png' />}
      />
    )
  }

  render() {

    const {
      commentsOpen,
      liked,
      likedCount,
      rateInfo,
      commented,
      commentsCount,
    } = this.state
    const { feedComments } = this.props
    if (rateInfo) {
      const { content, timestamp, actor } = rateInfo
      return (
        <Card
          style={styles.cardContainer}
          expanded={commentsOpen}
          className='bookpage-single-review'
        >
          <div className='bookpage-review-header'>
            <figure className='bookpage-review-figure'>
              <a href={actor.url}>
                <img src={actor.imageUrl}/>
              </a>
            </figure>
            <div className='bookpage-review-header-details'>
              <div className='bookpage-review-header-top'>
                <a href={actor.url} className='bookpage-review-fullname'>
                  {actor.fullname}
                </a>
                <div className='bookpage-review-rating'>
                  {this.renderRating(content.userRating)}
                </div>
              </div>
              <div className='bookpage-review-timestamp'>
              <span className='bookpage-review-timestamp-text'>
                {this.renderTime(timestamp)}
              </span>
              </div>
            </div>
          </div>
          <CardText className='bookpage-review-body'>
            {content.body && content.body !== '' ?
              (
                <p className='bookpage-review-body-text'>
                  {content.body}
                </p>
              ) : null
            }
          </CardText>
          <CardActions className='bookpage-review-footer'>
            <div className='bookpage-review-footer-container'>
              <div className='likes-count'>
                <a
                  onClick={this.handleLiked}
                  className={liked ? 'liked' : 'not-liked'}
                />
                <span className='not-liked-number'>{likedCount}</span>
              </div>
              <div className='comments-count'>
                <a
                  className={commented ? 'commented' : 'not-commented'}
                  onClick={this.handleCommentsOpen}
                />
                <span
                  className={commented ? 'commented-number' : 'not-commented-number'}
                >
                  {commentsCount}
                </span>
              </div>
            </div>
          </CardActions>
          <CardText
            className='comments-wrapper'
            expandable={true}
          >
            <div className='comments'>
              {feedComments ? this.handleRenderComments(feedComments) : null}
            </div>
            <div>
              {this.renderPostBox()}
            </div>
          </CardText>
        </Card>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    feedComments: state.tiles.feedComments,
    currentReader: state.currentReader
  }
}

const mapDispatchToProps = {
  updateLikes,
  updateComments,
  getComments,
}
export default connect(mapStateToProps, mapDispatchToProps)(Review)
