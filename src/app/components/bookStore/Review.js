import React, { PureComponent } from 'react'
import Rating from 'react-rating'
import moment from 'moment'
import { PrimaryButton } from '../common'
import {
  Card,
  CardActions,
  CardText,
} from 'material-ui'

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
      liked: false,
      likedCount: props.rateInfo.review.likesCount,
      commentsOpen: false,
    }
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

    const { rateInfo } = this.props
    const { score, review } = rateInfo
    const {
      commentsOpen,
      liked,
      likedCount,
    } = this.state
    return (
      <Card
        style={styles.cardContainer}
        expanded={commentsOpen}
        className='bookpage-single-review'
      >
        <div className='bookpage-review-header'>
          <figure className='bookpage-review-figure'>
            <a href={review.reviewer.url}>
              <img src={review.reviewer.imageUrl}/>
            </a>
          </figure>
          <div className='bookpage-review-header-details'>
            <div className='bookpage-review-header-top'>
              <a href={review.reviewer.url} className='bookpage-review-fullname'>
                {review.reviewer.fullname}
              </a>
              <div className='bookpage-review-rating'>
                {this.renderRating(score)}
              </div>
            </div>
            <div className='bookpage-review-timestamp'>
              <span className='bookpage-review-timestamp-text'>
                {this.renderTime(review.datetime)}
              </span>
            </div>
          </div>
        </div>
        <CardText className='bookpage-review-body'>
          {review.body && review.body !== '' ?
            (
              <p className='bookpage-review-body-text'>
                {review.body}
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
              <a className='not-commented' onClick={this.handleCommentsOpen}/>
              <span className='not-commented-number'>0</span>
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
}
export default Review
