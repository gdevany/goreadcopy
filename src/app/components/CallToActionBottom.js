import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export const CallToActionBottom = () => {
  return (
    <div className='center-text call-to-action-wrapper general-background'>
      <h1 className='general-font'>
        Ready to join the fastest growing book community?
      </h1><br />
      <RaisedButton
        backgroundColor='#4A4A4A'
        labelColor='white'
        label='Sign Up'
        href='#'
      />
      <br />
    </div>
  )
}

export default CallToActionBottom
