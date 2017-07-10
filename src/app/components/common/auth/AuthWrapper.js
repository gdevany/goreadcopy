import React, { PureComponent } from 'react'
import { Auth } from '../../../services'

class AuthWrapper extends PureComponent {
  render() {
    const isUserLoggedIn = Auth.currentUserExists()
    return (
      <div className='auth-wrapper'>
        {
          React.Children.map(this.props.children, child => {
            if (!child) { return null }
            if (child.type === 'div') {
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
