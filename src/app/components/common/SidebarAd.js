import React, { PureComponent } from 'react'

class SidebarAd extends PureComponent {
  render() {
    const { content, isProfileAd, adClass } = this.props
    return (
      <div style={adClass} className={isProfileAd ?
        'base-tile-sidebar-container' : 'base-tile-sidebar-container box'}
      >
        <div className='adv-sidebar-container'>
          <a href={content.isExternalTarget ? content.targetUrl : content.url}>
            <figure className='heading-overflow-figure'>
              <img className='heading-img' src={content.imageUrl} alt=''/>
            </figure>
            <div className='sidebar-content'>
              <h2 className='sidebar-title'>
                {content.heading}
              </h2>
              <div className='post-excerpt-container'>
                <p className='post-excerpt-pharagraph'>
                  {content.description}
                  <span
                    className='post-readmore-anchor'
                  >
                    Read more
                  </span>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default SidebarAd
