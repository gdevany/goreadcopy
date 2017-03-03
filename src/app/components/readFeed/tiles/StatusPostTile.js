import React, { Component } from 'react'

class StatusPostTile extends Component {
  render() {
    return (
      <div className='statuspost-tile-container'>
        <figure className='statuspost-figure'>
          <img className='statuspost-img' src='./image/image.jpg' alt=''/>
        </figure>
        <div className='statuspost-content'>
          <div className='post-excerpt-container'>
            <p className='post-excerpt-pharagraph'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos ratione cum sapiente quas, voluptas doloribus aperiam
              beatae placeat praesentium incidunt vitae inventore, rerum, enim
              iste sit dolor minus aliquid veritatis...
              <a href='#' className='post-readmore-anchor'>Read more</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default StatusPostTile
