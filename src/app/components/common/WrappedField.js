import React from 'react'
import R from 'ramda'
import { Errors } from '../../services'

const WrappedField = ({ field, errors, children }) => {
  const fieldErrors = errors[field]

  return R.isEmpty(fieldErrors) || R.isNil(fieldErrors) ?
    (
      <div className='form-input-wrapper'>
        {children}
      </div>
    ) :
    (
      <div className='error'>
        {children}
        <span className='message'>{Errors.messageFrom(fieldErrors)}</span>
      </div>
    )
}

export default WrappedField
