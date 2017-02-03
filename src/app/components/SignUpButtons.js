import React from 'react'
import PrimaryButton from './PrimaryButton'
import StepperIndex from '../redux/const/stepperIndex'

const SignUpButtons = ({ stepIndex, handleButtonClick, disabled, buttonType }) => {
  const isFinished = (stepIndex === StepperIndex.TWO) ? 'Finish' : 'Next'
  const isDisabled = stepIndex === StepperIndex.ZERO

  return (
    <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
      <PrimaryButton
        label={'Back'}
        value={'Back'}
        disabled={isDisabled}
        style={{ marginRight: 12 }}
        type={buttonType === 'form' ? 'submit' : null}
        onClick={buttonType === 'form' ? null : handleButtonClick}
      />
      <PrimaryButton
        label={isFinished}
        value={isFinished}
        disabled={disabled ? disabled : false}
        primary={true}
        type={buttonType === 'form' ? 'submit' : null}
        onClick={buttonType === 'form' ? null : handleButtonClick}
      />
    </div>
  )
}

export default SignUpButtons
