import React, { PureComponent } from 'react'
import { NavMenu } from '../common'
class MyProfile extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLogged: true
    }

  }
  render() {
    return (
      <div>
        <NavMenu />
      </div>
    )
  }
}

export default MyProfile
