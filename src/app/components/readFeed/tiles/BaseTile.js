import React, { Component } from 'react'
import { AlbumTile, ArticleTile, AuthorTile, StatusPostTile } from './'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite'
import CommentsIcon from 'material-ui/svg-icons/communication/chat-bubble-outline'
import ShareIcon from 'material-ui/svg-icons/social/share'

class BaseTile extends Component {
  render() {
    return (
      <div className='base-tile-container'>
        <div className='base-tile-header'>
          <figure className='tile-actor-figure'>
            <img className='tile-actor-image' src='./image/kendunn.jpg' alt=''/>
          </figure>
          <div className='tile-actor-details'>
            <div className='tile-actor-container'>
              <span className='tile-actor-name'>Mary Reynolds</span>
              <span className='tile-actor-action'>posted a photo</span>
            </div>
            <div className='tile-actor-timestamp'>
              <span>
                10m ago
              </span>
            </div>
          </div>
        </div>
        <div className='tile-main-content'>
          {this.props.tileType === 'AlbumTile' ? <AlbumTile /> : null}
          {this.props.tileType === 'ArticleTile' ? <ArticleTile /> : null}
          {this.props.tileType === 'AuthorTile' ? <AuthorTile /> : null}
          {this.props.tileType === 'StatusPostTile' ? <StatusPostTile /> : null}
        </div>
        <div className='base-tile-footer'>
          <div className='like-action-container'>
            <a href='#' className='like-anchor'>
              <FavoriteIcon className='liked'/>
            </a>
            <span className='likes-counter'>
              42
            </span>
          </div>
          <div className='comments-action-container'>
            <a href='#' className='comments-anchor'>
              <CommentsIcon />
            </a>
            <span className='comments-counter'>
              2
            </span>
          </div>
          <div className='shares-action-container'>
            <a href='#' className='shares-anchor'>
              <ShareIcon />
              <span className='shares-title'>
                Share
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default BaseTile
