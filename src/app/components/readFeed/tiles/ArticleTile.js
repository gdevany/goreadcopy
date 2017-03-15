import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class ArticleTile extends PureComponent {
  render() {
    const {
      tileDefaultProps: {
        author,
        timestamp,
        likes,
        comments,
        shareInfo,
        action,
        id
      },
      content
    } = this.props

    return (
      <TileDefault
        tileId={id}
        author={author}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        shareInfo={shareInfo}
        action={action}
      >
        <div className='article-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <figure className='heading-overflow-figure'>
            <img className='heading-img' src={content.image} alt=''/>
          </figure>
          <div className='article-content'>
            <h2 className='article-title'>{content.title}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.header}
                <a href={content.link} className='post-readmore-anchor'>Read more</a>
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default ArticleTile
