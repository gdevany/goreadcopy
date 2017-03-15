import React from 'react'
import { PrimaryButton, SecondaryButton } from '../common'
import Steps from './services/steps'
import { AuthedRedirect } from '../common'
import { ExternalRoutes } from '../../constants'

const styles = {
  nextButton: {
    float: 'right',
  },
  backButton: {
    float: 'left',
  },
}

const SignUpButtons = ({
  stepIndex,
  handleButtonClick,
  disabled,
  buttonType,
  shouldSubmit,
 }) => {
  const isFinished = (stepIndex === Steps.last()) ? 'Finish & go explore books' : 'Next'
  const isDisabled = stepIndex === Steps.first()

  if (stepIndex === Steps.first()) {
    return (
      <div style={{ marginTop: 50, marginBottom: 12 }}>
        <div style={styles.nextButton}>
          <PrimaryButton
            label={isFinished}
            value={isFinished}
            disabled={disabled ? disabled : false}
            primary={true}
            type={buttonType === 'form' ? 'submit' : null}
            onClick={handleButtonClick}
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
          onClick={handleButtonClick}
        />
      </div>
      <div style={styles.nextButton}>
      {
        shouldSubmit ?
          AuthedRedirect.Button({
            href: ExternalRoutes.readFeed(),
            children: isFinished,
            shouldSubmit
          }) : (
            <PrimaryButton
              label={isFinished}
              value={isFinished}
              disabled={disabled ? disabled : false}
              primary={true}
              type={buttonType === 'form' ? 'submit' : null}
              onClick={handleButtonClick}
            />
          )
      }
      </div>
    </div>
  )
}

SignUpButtons.defaultProps = {
  handleButtonClick: () => null,
}
export default SignUpButtons
