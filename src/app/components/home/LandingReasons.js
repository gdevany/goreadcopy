import React from 'react'
import Radium from 'radium'
import { Colors, Breakpoints } from '../../constants/style'

const styles = {
  reasons: {
    color: Colors.black,
    padding: '200px 50px 0px 60px',

    [Breakpoints.tablet]: {
      marginTop: 0,
      padding: 50,
    },
  },

  header: {
    color: Colors.black,
  },
}

const LandingReasons = ({ statement, description }) => {
  return (
    <div style={styles.reasons} className='landing-reasons-wrapper'>
      <h1 style={styles.header}>{statement}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Radium(LandingReasons)
