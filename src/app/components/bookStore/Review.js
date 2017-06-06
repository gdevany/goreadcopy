import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Rating from 'react-rating'
import { Tiles } from '../../redux/actions'
import moment from 'moment'
import { PrimaryButton } from '../common'
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
}

class Review extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      liked: props.rateInfo.likedByReader,
      likedCount: props.rateInfo.likes ? props.rateInfo.likes.count : 0,
      commented: props.rateInfo.commentedByReader,
      commentsCount: props.rateInfo.comments ? props.rateInfo.comments.count : 0,
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

  handleCommentsOpen = () => {
    const { commentsOpen } = this.state
    if (commentsOpen) {
      this.setState({
        commentsOpen: false,
      })
    } else {
      this.setState({
        commentsOpen: true,
      })
    }
  }

  renderPostBox = () => {
    const { currentReader } = this.props
    return (
      <div className='input-post-box comments-tile-container'>
        <div className='comments-elelemnts'>
          <img className='comments-image' src={currentReader.imageUrl} />
          <textarea
            type='text'
            className='search-input comments-textarea'
            placeholder='Share your thoughts'
            rows='3'
          />
        </div>
        <div className='center-text'>
          <PrimaryButton
            label='Post'
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
const mapDispatchToProps = {
  updateLikes,
  updateComments,
  getComments,
}
export default connect(null, mapDispatchToProps)(Review)
