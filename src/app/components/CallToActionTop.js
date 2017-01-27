import React from 'react'
import { RaisedButton } from 'material-ui'

export const CallToActionTop = () => {
  return (
    <div className='center-text call-to-action-wrapper'>
      <h1 className='general-font'>
        Where authors and readers come together
      </h1><br />
      <RaisedButton
        backgroundColor='#4A4A4A'
        labelColor='white'
        label='Sign Up'
        href='#'
      />
      <br /> <br />
      <a href='#'>
        Are you an author?
      </a>
    </div>
  )
}

export default CallToActionTop
