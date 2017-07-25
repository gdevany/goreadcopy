import React, { PureComponent } from 'react'
import { Auth } from '../../../services'
import R from 'ramda'

const isBlackListed = ['div', 'section']

class AuthWrapper extends PureComponent {
  render() {
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div className='auth-wrapper'>
        {
          React.Children.map(this.props.children, child => {
            if (!child) { return null }
            if (R.contains(child.type, isBlackListed)) {
              return React.cloneElement(child)
            }
            return React.cloneElement(child, {
              isUserLoggedIn
            })
          })
        }
      </div>
    )
  }
}

export default AuthWrapper
