import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Linkify from 'react-linkify'
// import Rating from 'react-rating'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class BookProductTile extends PureComponent {
  // renderRating = (rating) => {
  //   return (
  //     <Rating
  //       readonly={true}
  //       initialRate={rating}
  //       full={<img className='rating-icon' src='./image/star.svg' />}
  //       empty={<img className='rating-icon' src='./image/star-empty.svg' />}
  //     />
  //   )
  // }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  splitContent(content) {
    return content.split(mentionRegex)
  }

  splitMention(content) {
    return content.split('/')
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
        <Linkify properties={{ target: '_blank' }}>
          {entry}
        </Linkify>
      </span>)
  }

  render() {
    const {
      tileDefaultProps: {
        author,
        target,
        description,
        timestamp,
        likes,
        comments,
        shareInfo,
        action,
        id
      },
      content
    } = this.props

    const splittedContent = this.splitContent(content.socialComment)

    return (
      <TileDefault
        tileId={id}
        author={author}
        target={target}
        description={description}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {
              content.mentionsList !== null || content.socialComment !== 'None' ?
                (
                  splittedContent.map((entry, index) => {
                    return this.renderContentWithMentions(entry, index, content.mentionsList)
                  })
                ) : null
            }
          </p>
        </div>
        <div className='book-tile-container'>
          <figure className='book-figure'>
            <img className='book-img' src={content.image} alt=''/>
          </figure>
          <div className='book-content'>
            <h2 className='book-title'>{content.title ?
              this.truncInfo(content.title, 75) : null}
            </h2>
            <h4 className='book-author'>by {content.author}</h4>
            {/* <div className='book-rating-container'>
              {this.renderRating(Math.round(content.rating))}
            </div> */}
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            {content.description ? this.truncInfo(content.description, 225) : null}
            <a href={content.url} className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default BookProductTile
