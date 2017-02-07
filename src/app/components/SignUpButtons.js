import React from 'react'
import PrimaryButton from './PrimaryButton'
import StepperIndex from '../redux/const/stepperIndex'

const SignUpButtons = ({ stepIndex }) => {
  const isFinished = (stepIndex === StepperIndex.TWO) ? 'Finish' : 'Next'
  const isDisabled = stepIndex === StepperIndex.ZERO

  return (
    <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
      <PrimaryButton
        label={'Back'}
        type={'submit'}
        disabled={isDisabled}
        value={'Back'}
      />
      <PrimaryButton
        label={isFinished}
        type={'submit'}
        value={isFinished}
      />
    </div>
  )
}

export default SignUpButtons
