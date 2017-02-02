import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateUserData } from '../redux/actions/userData'
import SignUpStepOne from './SignUpStepOne'
import SignUpStepTwo from './SignUpStepTwo'
import StepperIndex from '../redux/const/stepperIndex'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ArrowIcon from 'material-ui/svg-icons/navigation/chevron-right'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui'

const styles = {
  stepperContainer: {
    margin: '0 auto',
    maxWidth: 600,
  },
}

class SignUpStepper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      finished: false,
      stepIndex: StepperIndex.ZERO
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500)
    })
  }

  handleNext = () => {
    const { stepIndex } = this.state
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + StepperIndex.ONE,
        finished: stepIndex >= StepperIndex.TWO
      }))
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - StepperIndex.ONE
      }))
    }
  }

  handleSubmit = (data, step) => {
    if (step === 'one') {
      const formData = {}
      for (const field in data) {
        formData[field] = data[field].value
      }

      data = formData
    }

    this.props.updateUserData(data)
  }

  handleReset = (event) => {
    event.preventDefault()
    this.setState({ stepIndex: StepperIndex.ZERO, finished: false })
  }

  isActiveStepper = (index) => {
    return this.state.stepIndex === index ? { fontWeight: 'bold' } : null
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <SignUpStepOne
              handleSubmit={this.handleSubmit}
              handleNext={this.handleNext}
              handlePrev={this.handlePrev}
              stepIndex={this.state.stepIndex}
            />
          </div>
        )
      case 1:
        return (
          <div>
            <SignUpStepTwo
              handleSubmit={ this.handleSubmit }
              handleNext={ this.handleNext }
              handlePrev={ this.handlePrev }
              stepIndex={ this.state.stepIndex }
            />
          </div>
        )
      case 2:
        return (
          <div>
              Some #3 Component will be rendered here
          </div>
        )
      default:
        return 'Where you at?'
    }
  }

  renderContent() {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px', overflow: 'hidden' } // temporary

    // TODO: Will we have a component when user is finished signing up
    // or will they be redirected?
    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a onClick={this.handleReset} >
              Click here
            </a> to reset the example.
          </p>
        </div>
      )
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    )
  }

  render() {
    const { loading, stepIndex } = this.state

    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <Stepper activeStep={stepIndex} style={styles.stepperContainer} connector={<ArrowIcon />}>
          <Step active={false} style={this.isActiveStepper(StepperIndex.ZERO)}>
            <StepLabel className='stepText'>
              Create your account
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(StepperIndex.ONE)}>
            <StepLabel className='stepText'>
              Add genres
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(StepperIndex.TWO)}>
            <StepLabel className='stepText'>
              Create read feed
            </StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    )
  }
}

export default connect(null, { updateUserData })(SignUpStepper)
