import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import LocationIcon from 'material-ui/svg-icons/communication/location-on'

class AuthorTile extends PureComponent {
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
        <div className='author-tile-container'>
          <h2 className='author-name'>
            <a href={content.link}>
              {content.name}
            </a>
          </h2>
          <h4 className='author-title'>Author</h4>
          <div className='author-location-container'>
            <LocationIcon className='author-location-icon'/>
            <h5 className='author-location'>
              {/**TODO Need about location prop **/}
              {content.location}
            </h5>
          </div>
          <div className='author-content'>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {/** TODO: Need Author content about prop **/}
                {content.about}
                <a href={content.link} className='post-readmore-anchor'>
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

export default AuthorTile
