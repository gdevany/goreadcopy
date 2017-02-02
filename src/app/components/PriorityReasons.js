import React from 'react'
import LandingImage from './LandingImage'
import LandingReasons from './LandingReasons'

const styles = {
  propContainer: {
    paddingTop: 150,
  },
};

const PriorityReasons = () => {
  return (
    <div>

      <div className='row' style={styles.propContainer}>
        <div className='small-12 medium-5 medium-offset-1 columns'>
          <LandingReasons
            statement={'Discover your next book'}
            description={"Find books you'll love while exploring our community"}
          />
        </div>
        <div className='small-12 medium-6 center-text columns'>
          {/**TODO: Check if this works in staging/production.
            If not either we change the path based on the environment
            or maybe we change webpack config?
          **/}
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div className='small-12 medium-6 center-text columns'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
        <div className='small-12 medium-5 end columns'>
          <LandingReasons
            statement={'Join your favorite book clubs and make friends'}
            description={'Meet and engage with over 60,000+ users'}
          />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div className='small-12 medium-5 medium-offset-1 columns'>
          <LandingReasons
            statement={'Earn your favorite books'}
            description={'Get any book shipped to you by just hanging out with other on GoRead'}
          />
        </div>
        <div className='small-12 medium-6 center-text columns'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div className='small-12 medium-6 center-text columns'>
          <LandingImage imageUrl='./image/reasonsImageExample.png' />
        </div>
        <div className='small-12 medium-5 end columns'>
          <LandingReasons
            statement={'Build a following'}
            description={'Engage with other readers and establish your online presence'}
          />
        </div>
      </div>

    </div>
  )
}

export default PriorityReasons
