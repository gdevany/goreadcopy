import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
//import ReactPlayer from 'react-player'

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
    console.log(content)
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
          <div className='video-iframe-container'>
            {/* <ReactPlayer
              className='video-player'
              url={content.link}
            /> */}
            <iframe src={content.link} frameBorder='0'/>
          </div>
          <div className='video-content'>
            <h2 className='video-title'>{content.tile}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                {/** TODO: Do we need this?
                <a href='#' className='post-readmore-anchor'>Read more</a> **/}
              </p>
            </div>
          </div>
        </div>
      </TileDefault>
    )
  }
}

export default VideoTile
