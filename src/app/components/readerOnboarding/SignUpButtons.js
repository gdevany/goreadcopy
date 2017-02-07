import React from 'react'
import { PrimaryButton } from '../common'
import Steps from './services/steps'

const SignUpButtons = ({ stepIndex, handleButtonClick, disabled, buttonType }) => {
  const isFinished = (stepIndex === Steps.last()) ? 'Finish' : 'Next'
  const isDisabled = stepIndex === Steps.first()

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
