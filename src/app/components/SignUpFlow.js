import React from 'react'
import SignUpStepper from './SignUpStepper'
import { Colors } from './style';

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
