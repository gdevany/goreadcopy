import React from 'react'
import { PrimaryButton, SecondaryButton } from '../common'
import Steps from './services/steps'

const styles = {
  nextButton: {
    float: 'right',
  },
  backButton: {
    float: 'left',
  },
}

const SignUpButtons = ({ stepIndex, handleButtonClick, disabled, buttonType }) => {
  const isFinished = (stepIndex === Steps.last()) ? 'Finish' : 'Next'
  const isDisabled = stepIndex === Steps.first()

  console.log(`The step index is ${stepIndex}`)

  if (stepIndex === 0) {
    return (
      <div style={{ marginTop: 50, marginBottom: 12 }}>
        <div style={styles.nextButton}>
          <PrimaryButton
            label={isFinished}
            value={isFinished}
            disabled={disabled ? disabled : false}
            primary={true}
            type={buttonType === 'form' ? 'submit' : null}
            onClick={buttonType === 'form' ? null : handleButtonClick}
          />
        </div>
      </div>
    )
  }
  return (
    <div style={{ marginTop: 50, marginBottom: 12 }}>
      <div style={styles.backButton}>
        <SecondaryButton
          label={'Back'}
          value={'Back'}
          disabled={isDisabled}
          style={{ marginRight: 12 }}
          type={buttonType === 'form' ? 'submit' : null}
          onClick={buttonType === 'form' ? null : handleButtonClick}
        />
      </div>
      <div style={styles.nextButton}>
        <PrimaryButton
          label={isFinished}
          value={isFinished}
          disabled={disabled ? disabled : false}
          primary={true}
          type={buttonType === 'form' ? 'submit' : null}
          onClick={buttonType === 'form' ? null : handleButtonClick}
        />
      </div>
    </div>
  )
}
export default SignUpButtons
