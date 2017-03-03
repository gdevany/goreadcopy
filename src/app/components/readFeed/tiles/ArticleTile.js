import React, { Component } from 'react'

class ArticleTile extends Component {
  render() {
    return (
      <div className='article-tile-container'>
        <figure className='article-heading-figure'>
          <img className='harticle-heading-img' src='./image/image.jpg' alt=''/>
        </figure>
        <div className='article-content'>
          <h2 className='article-title'>Lorem ipsun dolor sit amet</h2>
          <div className='article-excerpt-container'>
            <p className='article-excerpt-pharagraph'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos ratione cum sapiente quas, voluptas doloribus aperiam
              beatae placeat praesentium incidunt vitae inventore, rerum, enim
              iste sit dolor minus aliquid veritatis...
              <a href='#' className='article-readmore-anchor'>Read more</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleTile
