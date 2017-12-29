import React, { PureComponent } from 'react'
import Radium from 'radium'
import { withRouter } from 'react-router'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import ArrowIcon from 'material-ui/svg-icons/navigation/chevron-right'
import { Colors, Breakpoints } from '../../constants/style'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui'
import SignUpStepOne from './SignUpStepOne'
import SignUpStepTwo from './SignUpStepTwo'
import SignUpStepThree from './SignUpStepThree'
import SignUpSpecialOffer from './SignUpSpecialOffer'
import Steps from './services/steps'
import Promise from 'bluebird'
import { CONTEXTS as C } from '../../constants/litcoins'
import PropTypes from 'prop-types'

const styles = {
  stepperContainer: {
    margin: '0 auto',
    maxWidth: 600,

    [Breakpoints.mobile]: {
      display: 'none',
    },
  },

  activeText: {
    color: Colors.blue,
  },

  contentStyle: {
    overflow: 'hidden',
  },
}

class SignUpStepper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      finished: false,
      stepIndex: this.startingStep(),
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  startingStep = () => {
    const { step } = this.props.router.location.query
    return Steps.fromName(step) || Steps.first()
  }

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500)
    })
  }

  handleNext = () => {
    return new Promise((resolve, reject) => {
      const { stepIndex } = this.state
      if (!this.state.loading) {
        resolve(
          this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: Steps.next(stepIndex),
            finished: Steps.finished(stepIndex),
          }))
        )
      } else {
        reject('still is loading')
      }
    })
  }

  handlePrev = () => {
    return new Promise((resolve, reject) => {
      const { stepIndex } = this.state
      if (!this.state.loading) {
        resolve(
            this.dummyAsync(() => this.setState({
              loading: false,
              stepIndex: Steps.previous(stepIndex),
            }))
        )
      } else {
        reject('still is loading')
      }
    })
  }

  handleFinish = () => {
    return new Promise((resolve, reject) => {
      if (!this.state.loading) {
        resolve(
          this.dummyAsync(() => this.setState({
            finished: true,
          }))
        )
      } else {
        reject('still is loading')
      }
    })
  }

  handleReset = (event) => {
    event.preventDefault()
    this.setState({ stepIndex: Steps.first(), finished: false })
  }

  isActiveStepper = (index) => {
    return this.state.stepIndex === index ? 'signup-active-stepper' : null
  }

  isActiveLabel = (index) => {
    return this.state.stepIndex === index ? { color: Colors.blue } : null
  }

  isPrevStep = (index) => {
    return index < this.state.stepIndex ? 'complete-sign-up-step' : null
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
              context={C.ONBOARDING}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <SignUpStepThree
              handleNext={this.handleFinish}
              handlePrev={this.handlePrev}
              stepIndex={this.state.stepIndex}
              clickedSelectAll={this.props.clickedSelectAll}
              context={C.ONBOARDING}
            />
          </div>
        )
      default:
        return 'Where you at?'
    }
  }

  renderContent() {
    const { stepIndex } = this.state
    return (
      <div style={styles.contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
      </div>
    )
  }

  render() {
    const { loading, stepIndex, finished } = this.state
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        {finished ? (
        <SignUpSpecialOffer />
        ) : (
        <div>
          <div style={styles.stepperContainer}>
            <Stepper
              activeStep={stepIndex}
              connector={<ArrowIcon color={Colors.medGrey} />}
            >
              <Step active={false} className={this.isActiveStepper(Steps.STEPS.USER_INFO)}>
                <StepLabel className={this.isPrevStep(Steps.STEPS.USER_INFO)}>
                  Create your account
                </StepLabel>
              </Step>

              <Step active={false} className={this.isActiveStepper(Steps.STEPS.SELECT_GENRES)}>
                <StepLabel className={this.isPrevStep(Steps.STEPS.SELECT_GENRES)}>
                  Add genres
                </StepLabel>
              </Step>

              <Step active={false} className={this.isActiveStepper(Steps.STEPS.SELECT_USERS)}>
                <StepLabel className={this.isPrevStep(Steps.STEPS.SELECT_USERS)}>
                  Create read feed
                </StepLabel>
              </Step>

            </Stepper>
          </div>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>)
      }
      </div>
    )
  }
}

export default withRouter(Radium(SignUpStepper))
