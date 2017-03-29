import React, { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import SignUpStepper from './SignUpStepper'
import { Colors } from '../../constants/style'
import TopBanner from './TopBanner'

const styles = {
  signUpContainer: {
    backgroundColor: Colors.lightGrey,
    height: '100vh',
  },
}

class SignUpFlow extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectAll: false
    }

    this.clickedSelectAll = this.clickedSelectAll.bind(this)
  }

  clickedSelectAll() {
    const { selectAll } = this.state
    if (selectAll) this.setState({ selectAll: false })
    else this.setState({ selectAll: true })
  }

  render() {
    return (
      <div style={styles.signUpContainer}>
        <Helmet>
          <title>GoRead | Onboarding</title>
        </Helmet>
        <TopBanner selectAll={this.state.selectAll}/>
        <SignUpStepper clickedSelectAll={this.clickedSelectAll}/>
      </div>
    )
  }
}

export default SignUpFlow
