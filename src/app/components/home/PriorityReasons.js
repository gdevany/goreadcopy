import React from 'react'
import LandingReasons from './LandingReasons'
import { Breakpoints } from '../../constants/style'
import Radium from 'radium'

const styles = {
  propContainer: {
    maxWidth: '100%',
    position: 'relative',
    zIndex: 0,

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
        <div
          style={styles.textContainer}
          className='medium-12 large-5 large-offset-1 priority columns'
        >
          <LandingReasons
            statement={'Discover your next book'}
            description={'Find books you love while exploring our community'}
          />
        </div>
        <div
          style={styles.imageContainer}
          className='medium-12 large-6 landing-image-1 center-text columns'
        />
          {/**TODO: Check if this works in staging/production.
            If not either we change the path based on the environment
            or maybe we change webpack config?
          **/}
      </div>

      <div className='row' style={styles.propContainer}>
        <div
          style={styles.rightTextContainer}
          className='medium-12 large-5 large-push-6 priority end columns'
        >
          <LandingReasons
            statement={'Join your favorite book clubs'}
            description={'Meet and engage with over 60,000+ users'}
          />
        </div>

        <div
          style={styles.imageContainer}
          className='medium-12 large-6 large-pull-6 landing-image-2 center-text columns'
        />
      </div>

      <div className='row' style={styles.propContainer}>
        <div
          style={styles.textContainer}
          className='medium-12 large-5 large-offset-1 priority columns'
        >
          <LandingReasons
            statement={'Earn your favorite books'}
            description={'Get any book shipped to you by just hanging out with other on GoRead'}
          />
        </div>
        <div
          style={styles.imageContainer}
          className='medium-12 large-6 landing-image-3 center-text columns'
        />
      </div>

      <div className='row' style={styles.propContainer}>
        <div
          style={styles.rightTextContainer}
          className='medium-12 large-5 large-push-6 end priority columns'
        >
          <LandingReasons
            statement={'Build a community'}
            description={'Engage with other readers and establish your online presence'}
          />
        </div>
        <div
          style={styles.imageContainer}
          className='medium-12 large-6 large-pull-6 landing-image-4 center-text columns'
        />
      </div>

    </div>
  )
}

export default Radium(PriorityReasons)
