import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'

class AppearanceTile extends PureComponent {
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
        <div className='appearance-tile-container'>
          <div className='appearance-container'>
            <h4 className='appearance-title'>{content.title}</h4>
            <div className='appearance-row'>
              <div className='appearance-column'>
                <span className='appearance-label'>Starts</span>
                <h4 className='appearance-date'>{content.start.date}</h4>
                <h5 className='appearance-time'>@ {content.start.time}</h5>
              </div>
              <div className='appearance-column'>
                <span className='appearance-label'>Ends</span>
                <h4 className='appearance-date'>{content.end.date}</h4>
                <h5 className='appearance-time'>@ {content.end.time}</h5>
              </div>
            </div>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                {
                  content.url ?
                    (
                      <a
                        href={content.url}
                        className='post-readmore-anchor'
                      >
                        See full details
                      </a>
                    ) : null
                }

              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default AppearanceTile
