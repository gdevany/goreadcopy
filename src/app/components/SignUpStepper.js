import React, { PureComponent } from 'react'
import StepperIndex from '../redux/const/stepperIndex'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ArrowIcon from 'material-ui/svg-icons/navigation/chevron-right'
import {
  Step,
  Stepper,
  StepLabel,
  RaisedButton,
  FlatButton,
  TextField
} from 'material-ui'

class SignUpStepper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      finished: false,
      stepIndex: StepperIndex.ZERO
    }
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

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <p>
              Some #1 Component will be rendered here
          </p>
        )
      case 1:
        return (
          <div>
              Some #2 Component will be rendered here
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

  isActiveStepper = (index) => {
    return this.state.stepIndex === index ? { fontWeight: 'bold' } : null
  }

  handleReset = (event) => {
    event.preventDefault()
    this.setState({ stepIndex: StepperIndex.ZERO, finished: false })
  }

  renderContent() {
    const { finished, stepIndex } = this.state
    const contentStyle = {margin: '0 16px', overflow: 'hidden'} // temporary

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
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === StepperIndex.ZERO}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === StepperIndex.TWO ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    )
  }

  render() {
    const { loading, stepIndex } = this.state

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} connector={<ArrowIcon />}>
          <Step active={false} style={this.isActiveStepper(StepperIndex.ZERO)}>
            <StepLabel>
              Create your account
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(StepperIndex.ONE)}>
            <StepLabel>
              Add genres
            </StepLabel>
          </Step>
          <Step active={false} style={this.isActiveStepper(StepperIndex.TWO)}>
            <StepLabel>
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

export default SignUpStepper
