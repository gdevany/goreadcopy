import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import ReactPlayer from 'react-player'

class VideoTile extends PureComponent {
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
        <div className='video-tile-container'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              {content.socialComment ? content.socialComment : null}
            </p>
          </div>
          <div className='video-iframe-container'>
            <ReactPlayer
              className='video-player'
              controls={true}
              url={content.originUrl}
            />
          </div>
          <div className='video-content'>
            <h2 className='video-title'>{content.tile}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default VideoTile
