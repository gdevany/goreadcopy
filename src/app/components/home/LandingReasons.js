import React from 'react'
import Radium from 'radium'
import { Colors, Breakpoints } from '../../constants/style'

const styles = {
  reasons: {
    color: Colors.black,
    margin: '0 auto',
    maxWidth: 400,
    paddingTop: 200,

    [Breakpoints.tablet]: {
      marginTop: 0,
      maxWidth: 500,
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
