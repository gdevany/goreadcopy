import React, { PureComponent } from 'react'
import { Card } from 'material-ui'

class SidebarAd extends PureComponent {
  render() {
    return (
      <Card className='base-tile-sidebar-container'>
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
      </Card>
    )
  }
}

export default SidebarAd
