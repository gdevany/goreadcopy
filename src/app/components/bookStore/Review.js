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
      likedCount: 12,
      commentsOpen: false,
    }
  }
  renderTime = (time) => {
    if (moment(moment.unix(time)).isValid()) {
      return moment(moment.unix(time))
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
    return (
      <div className='input-post-box comments-tile-container'>
        <div className='comments-elelemnts'>
          <img className='comments-image' src='/image/kendunn.jpg' />
          <textarea
            type='text'
            className='search-input comments-textarea'
            placeholder='Share your thoughts'
            rows='3'
          />
        </div>
        <div>
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

    const { score } = this.props.rateInfo
    const { reviews } = this.props.rateInfo.rating
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
            <a>
              <img src='/image/kendunn.jpg'/>
            </a>
          </figure>
          <div className='bookpage-review-header-details'>
            <div className='bookpage-review-header-top'>
              <a className='bookpage-review-fullname'>
                {`${reviews.reviewer.firstName} ${reviews.reviewer.lastName}`}
              </a>
              <div className='bookpage-review-rating'>
                {this.renderRating(score)}
              </div>
            </div>
            <div className='bookpage-review-timestamp'>
              <span className='bookpage-review-timestamp-text'>
                {this.renderTime(reviews.datetime)}
              </span>
            </div>
          </div>
        </div>
        <CardText className='bookpage-review-body'>
          <p className='bookpage-review-body-text'>
            {reviews.body && reviews.body !== '' ? reviews.body : 'No text provided'}
          </p>
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
