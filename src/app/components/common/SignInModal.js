import React, { Component } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { ExternalRoutes as routes } from '../../constants';
import { Auth as AuthServices } from '../../services';
import { Auth, Chat, Notifications, ReaderData } from '../../redux/actions';
import PrimaryButton from './PrimaryButton';
import SocialButton from './SocialButton';
import { LoginForm } from './data/forms';
import { BaseNavView } from '../views';

const { processUserLogin, cleanUserLoginErrors } = Auth;
const { getChatContacts } = Chat;
const { loadNotifications } = Notifications;
const { resetUserPassword } = ReaderData;

class SignInModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showLoader: false,
      isPassForgotten: false,
      isRecoverSubmit: false,
      isRecoverError: false,
      isRecoverErrorMessage: null,
    };
  }

  shouldComponentUpdate = () => {
    if (AuthServices.currentUserExists()) {
      browserHistory.push('/');
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ showLoader: true });
    const credentials = R.pick(['username', 'password'], this.state);
    this.props.processUserLogin(credentials)
      .then(() => { this.props.getChatContacts(); })
      .then(() => { this.props.loadNotifications(); })
      .then(() => {
        this.setState({ showLoader: false }, this.props.handleClose);
      })
      .catch(() => { this.setState({ showLoader: false }); });
  }

  handleSubmitRecovery = (event) => {
    event.preventDefault();
    const submitEmail = document.getElementsByClassName('recovery-input')[0].value;
    if (submitEmail) {
      this.props.resetUserPassword(submitEmail)
        .then(() => {
          this.setState({
            isPassForgotten: false,
            isRecoverSubmit: true,
          });
        })
        .catch((err) => {
          this.setState({
            isRecoverError: true,
            isRecoverErrorMessage: err.response ? err.response.data ? err.response.data.errors ?
              err.response.data.errors.email.message : null : null : null,
          });
        });
    }
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value });
  })

  handleCleanInputs = () => {
    this.setState({
      username: '',
      password: '',
    });
    this.props.cleanUserLoginErrors();
  }

  handleOnForgottenChange = () => {
    this.setState({
      isPassForgotten: true,
    });
  }

  handleCloseModal = () => {
    const { handleClose } = this.props;
    handleClose();
    this.handleRecoveryCancel();
  }

  handleRecoveryCancel = () => {
    this.setState({
      isPassForgotten: false,
      isRecoverSubmit: false,
    });
  }

  handleRecoveryError = () => {
    this.setState({
      isRecoverError: false,
    });
  }

  checkRedirectionQuery = () => (
    location.search.split('r=')[1] || '/'
  )

  render() {
    const {
      isPassForgotten,
      isRecoverSubmit,
      isRecoverError,
      isRecoverErrorMessage,
    } = this.state;
    const redirectionURL = this.checkRedirectionQuery();
    return (
      <BaseNavView>
        <div className="row login-content">
          {isPassForgotten || isRecoverSubmit ? (
            <div className="center-text">
              <h1 className="center-text large-header top-container">
                Forgot your Password?
              </h1>
              {isRecoverSubmit ? (
                <div>
                  <div className="success-panel">
                    <strong>
                      <p>
                        Success!
                      </p>
                      <p>
                        An email will arrive to your inbox soon with the password
                        reset instructions.
                      </p>
                    </strong>
                  </div>
                  <div className="center-text recovery-buttons">
                    <PrimaryButton
                      label="Return to Login"
                      onClick={this.handleRecoveryCancel}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    Send us your email address and we'll send a mail to restablish your account.
                  </p>
                  <div className={isRecoverError ? 'error' : null}>
                    <input
                      type="text"
                      className="form-input recovery-input"
                      placeholder="Email"
                      onChange={this.handleRecoveryError}
                    />
                    {isRecoverError ? (
                      <p>
                        {isRecoverErrorMessage ? isRecoverErrorMessage :
                          'Please check the email is correct.'}
                      </p>
                      ) : null
                    }
                  </div>
                  <div className="center-text recovery-buttons">
                    <PrimaryButton
                      label="Recover Password"
                      onClick={this.handleSubmitRecovery}
                    />
                    <PrimaryButton
                      label="Cancel"
                      onClick={this.handleRecoveryCancel}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="center-text large-header top-container">
                Sign in to GoRead
              </h1>
              <div className="center-text">
                <SocialButton
                  href={routes.providerLogin({ provider: 'facebook' })}
                  text="Continue with Facebook"
                  backgroundColor="#3B5998"
                  icon="/image/facebook.png"
                />
                <SocialButton
                  href={routes.providerLogin({ provider: 'google' })}
                  text="Continue with Google"
                  backgroundColor="#EA4235"
                  icon="/image/google.png"
                />
                <SocialButton
                  href={routes.providerLogin({ provider: 'linkedin' })}
                  text="Continue with Linkedin"
                  backgroundColor="#0077B5"
                  icon="/image/linkedin.png"
                />
              </div>
              <h4 className="inner-title center-text">
                or sign in with email:
              </h4>
              <div className="form-container">
                <LoginForm
                  onSuccess={() => { browserHistory.push(redirectionURL); }}
                  onError={null}
                />
                <div className="forgot-password" onClick={this.handleOnForgottenChange}>
                  <span>
                    Forgot password?
                  </span>
                </div>
              </div>
            </div>)}
        </div>
      </BaseNavView>
    );
  }
}

const mapStateToProps = R.prop('readerData');

const mapDispatchToProps = {
  processUserLogin,
  cleanUserLoginErrors,
  getChatContacts,
  loadNotifications,
  resetUserPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInModal);
