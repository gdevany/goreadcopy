import React from 'react'
import LandingImage from './LandingImage'
import LandingReasons from './LandingReasons'

const PriorityReasons = () => {
  return (
    <div>

      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingReasons
            statement= {'Discover your next book'}
            description={'Find books you\'ll love while exploring our community'}
          />
        </div>
        <div className='side-right'>
          {/**TODO: Check if this works in staging/production.
            If not either we change the path based on the environment
            or maybe we change webpack config?
          **/}
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
      </div>

      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
        <div className='side-right'>
          <LandingReasons
            statement= {'Join your favorite book clubs and make friends'}
            description={'Meet and engage with over 60,000+ users'}
          />
        </div>
      </div>

      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingReasons
            statement= {'Earn your favorite books'}
            description={'Get any book shipped to you by just hanging out with other on GoRead'}
          />
        </div>
        <div className='side-right'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
      </div>

      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
        <div className='side-right'>
          <LandingReasons
            statement= {'Build a following'}
            description={'Engage with other readers and establish your online presence'}
          />
        </div>
      </div>

    </div>
  )
}

export default PriorityReasons
