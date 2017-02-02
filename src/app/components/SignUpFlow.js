import React from 'react'
import SignUpStepper from './SignUpStepper'
import { Colors } from '../redux/const/style'

const styles = {
  signUpContainer: {
    backgroundColor: Colors.lightGrey,
    height: '100vh',
  },
};

const SignUpFlow = () => {
  return (
    <div style={styles.signUpContainer}>
      <SignUpStepper />
    </div>
  )
}

export default SignUpFlow
