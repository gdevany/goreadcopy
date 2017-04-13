import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import TileDefault from '../TileDefault'
import Anchorify from 'react-anchorify-text'

const mentionRegex = /(\@\[\d+\:\d+\])/gi

class BookClubTile extends PureComponent {

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
        <Anchorify
          text={entry}
          target='_blank'
        />
      </span>)
  }

  render() {
    const {
      tileDefaultProps: {
        author,
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
              content.mentionsList !== null ?
                (
                  splittedContent.map((entry, index) => {
                    return this.renderContentWithMentions(entry, index, content.mentionsList)
                  })
                ) : null
            }
          </p>
        </div>
        <div className='bookclub-tile-container'>
          <figure className='bookclub-figure'>
            <a href={content.url}>
              <img className='bookclub-img' src={content.image} alt='book-club'/>
            </a>
          </figure>
          <div className='bookclub-content'>
            <a href={content.url}>
              <h2 className='bookclub-name'>{content.title}</h2>
            </a>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                <a href={content.url} className='post-readmore-anchor'>
                  Read more
                </a>
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default BookClubTile
