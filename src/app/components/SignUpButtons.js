import React from 'react'
import StepperIndex from '../redux/const/stepperIndex'
import { RaisedButton, FlatButton } from 'material-ui'

const SignUpButtons = ({ stepIndex }) => {
  const isFinished = (stepIndex === StepperIndex.TWO) ? 'Finish' : 'Next'
  const isDisabled = stepIndex === StepperIndex.ZERO

  return (
    <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
      {/** If using regular button KEEP VALUE below **/}
      <FlatButton
        label='Back'
        value='Back'
        disabled={isDisabled}
        style={{ marginRight: 12 }}
      />
      {/** If using regular button KEEP VALUE below **/}
      <RaisedButton
        label={isFinished}
        value={isFinished}
        primary={true}
        type='submit'
      />
    </div>
  )
}

export default SignUpButtons
