import React, { PureComponent } from 'react'

class SidebarAd extends PureComponent {
  render() {
    return (
      <div className='base-tile-sidebar-container box'>
        <div className='adv-sidebar-container'>

          <figure className='heading-overflow-figure'>
            <img className='heading-img' src='./image/image.jpg' alt=''/>
          </figure>

          <div className='sidebar-content'>
            <h2 className='sidebar-title'>Lorem ipsun dolor sit amet</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                enimiste sit dolor minus aliquid veritatis...
                <a href='#' className='post-readmore-anchor'>Read more</a>
              </p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SidebarAd
