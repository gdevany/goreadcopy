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
            <a href={content.isExternalTarget ? content.targetUrl : content.url}>
              <img className='heading-img' src={content.imageUrl} alt=''/>
            </a>
          </figure>

          <div className='sidebar-content'>
            <h2 className='sidebar-title'>
              <a href={content.isExternalTarget ? content.targetUrl : content.url}>
                {content.heading}
              </a>
            </h2>
            <div className='post-excerpt-container'>
              <p className='post-excerpt-pharagraph'>
                <a href={content.isExternalTarget ? content.targetUrl : content.url}>
                  {content.description}
                </a>
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
