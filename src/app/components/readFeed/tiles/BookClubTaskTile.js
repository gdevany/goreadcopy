import React, { Component } from 'react'

class BookClubTaskTile extends Component {
  render() {
    return (
      <div className='statuspost-tile-container'>
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

export default BookClubTaskTile
