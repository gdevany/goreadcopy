import React from 'react'
import LandingImage from './LandingImage'
import LandingReasons from './LandingReasons'

export const PriorityReasons = () => {
  return (
    <div>
      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingReasons
            statement= {'Discover new books and book clubs you\'ll love'}
            description={`At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
            quos dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia animi,
            id est laborum et dolorum fuga`}
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
            statement= {'Follow your favorite authors and access their exclusive reads'}
            description={`At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
            quos dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia animi,
            id est laborum et dolorum fuga`}
          />
        </div>
      </div>
      <div className='side-by-side-wrapper landing-priority-wrapper'>
        <div className='side-left side-left-landing'>
          <LandingReasons
            statement= {'Earn your favorite books with GoRead Litcoins'}
            description={`At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
            quos dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia animi,
            id est laborum et dolorum fuga`}
          />
        </div>
        <div className='side-right'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
      </div>
    </div>
  )
}

export default PriorityReasons
