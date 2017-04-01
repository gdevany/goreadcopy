import React, { PureComponent } from 'react'

class SidebarAd extends PureComponent {
  render() {
    const { content, isProfileAd } = this.props
    return (
      <div className={isProfileAd ?
        'base-tile-sidebar-container' : 'base-tile-sidebar-container box'}
      >
        <div className='adv-sidebar-container'>
          <figure className='heading-overflow-figure'>
            <img className='heading-img' src={content.imageUrl} alt=''/>
          </figure>

          <div className='sidebar-content'>
            <h2 className='sidebar-title'>{content.heading}</h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                {content.description}
                <a
                  href={content.isExternalTarget ? content.targetUrl : content.url}
                  className='post-readmore-anchor'
                >
                  Read more
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default SidebarAd
