import React from 'react'
import LandingImage from './LandingImage'
import LandingReasons from './LandingReasons'
import { Breakpoints } from '../../constants/style'

const styles = {
  propContainer: {
    maxWidth: '100%',
    paddingTop: 100,
    position: 'relative',

    [Breakpoints.tablet]: {
      paddingTop: 0,
    },
  },

  imageContainer: {
    padding: 0,
  },
}

const PriorityReasons = () => {
  return (
    <div>
      <div className='row' style={styles.propContainer}>
        <div style={styles.textContainer} className='medium-12 large-5 large-offset-1 columns'>
          <LandingReasons
            statement={'Discover your next book'}
            description={"Find books you'll love while exploring our community"}
          />
        </div>
        <div style={styles.imageContainer} className='medium-12 large-6 center-text columns'>
          {/**TODO: Check if this works in staging/production.
            If not either we change the path based on the environment
            or maybe we change webpack config?
          **/}
          <LandingImage imageUrl='./image/discover.jpg' />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div
          style={styles.rightTextContainer}
          className='medium-12 large-5 large-push-6 end columns'
        >
          <LandingReasons
            statement={'Join your favorite book clubs'}
            description={'Meet and engage with over 60,000+ users'}
          />
        </div>

        <div
          style={styles.imageContainer}
          className='medium-12 large-6 large-pull-6 center-text columns'
        >
          <LandingImage imageUrl='./image/bookclub.jpg' />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div style={styles.textContainer} className='medium-12 large-5 large-offset-1 columns'>
          <LandingReasons
            statement={'Earn your favorite books'}
            description={'Get any book shipped to you by just hanging out with other on GoRead'}
          />
        </div>
        <div style={styles.imageContainer} className='medium-12 large-6 center-text columns'>
          <LandingImage imageUrl='./image/earn.jpg' />
        </div>
      </div>

      <div className='row' style={styles.propContainer}>
        <div
          style={styles.rightTextContainer}
          className='medium-12 large-5 large-push-6 end columns'
        >
          <LandingReasons
            statement={'Build a community'}
            description={'Engage with other readers and establish your online presence'}
          />
        </div>
        <div
          style={styles.imageContainer}
          className='medium-12 large-6 large-pull-6 center-text columns'
        >
          <LandingImage imageUrl='./image/community.jpg' />
        </div>
      </div>

    </div>
  )
}

export default PriorityReasons
