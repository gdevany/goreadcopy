import React, { Component } from 'react'

class ArticleTile extends Component {
  render() {
    return (
      <div className='article-tile-container'>
        <figure className='heading-overflow-figure'>
          <img className='heading-img' src='./image/image.jpg' alt=''/>
        </figure>
        <div className='article-content'>
          <h2 className='article-title'>Lorem ipsun dolor sit amet</h2>
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

export default ArticleTile
