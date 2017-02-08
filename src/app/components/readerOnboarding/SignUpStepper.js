import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ArrowIcon from 'material-ui/svg-icons/navigation/chevron-right'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui'
import SignUpStepOne from './SignUpStepOne'
import SignUpStepTwo from './SignUpStepTwo'
import SignUpStepThree from './SignUpStepThree'
import Steps from './services/steps'

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
      stepIndex: this.startingStep()
    }

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  startingStep() {
    const { step } = this.props.router.location.query
    return Steps.fromName(step) || Steps.first()
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
        stepIndex: Steps.next(stepIndex),
        finished: Steps.finished(stepIndex),
      }))
    }
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: Steps.previous(stepIndex),
      }))
    }
  }

  handleReset = (event) => {
    event.preventDefault()
    this.setState({ stepIndex: Steps.first(), finished: false })
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
              handleNext={this.handleNext}
              handlePrev={this.handlePrev}
              stepIndex={this.state.stepIndex}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <SignUpStepThree
              handleNext={this.handleNext}
              handlePrev={this.handlePrev}
              stepIndex={this.state.stepIndex}
            />
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
          <Step active={false} style={this.isActiveStepper(Steps.STEPS.USER_INFO)}>
            <StepLabel className='stepText'>
              Create your account
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(Steps.STEPS.SELECT_GENRES)}>
            <StepLabel className='stepText'>
              Add genres
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(Steps.STEPS.SELECT_USERS)}>
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

export default withRouter(SignUpStepper)
