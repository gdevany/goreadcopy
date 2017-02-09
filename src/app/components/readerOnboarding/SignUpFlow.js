import React from 'react'
import SignUpStepper from './SignUpStepper'
import { Colors } from '../../constants/style'
import TopBanner from './TopBanner'

const styles = {
  signUpContainer: {
    backgroundColor: Colors.lightGrey,
    height: '100vh',
  },
}

const SignUpFlow = () => {
  return (
    <div style={styles.signUpContainer}>
      <TopBanner />
      <SignUpStepper />
    </div>
  )
}

export default SignUpFlow
