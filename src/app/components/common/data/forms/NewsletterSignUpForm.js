import React from 'react';
import { waterfall } from 'async';
import PropTypes from 'prop-types';
import Form from './Form';
import { TextFieldInput } from '../fields';
import { RuleManager, Rules } from '../validations';
import { Newsletter } from '../../../../pipelines';

const { ruleRunner } = RuleManager;
const { required, isEmail } = Rules;
const { stageNewsletterSignUp } = Newsletter;

const params = {
  payloads: {
    NEWSLETTER_SIGNUP: [
      'email',
    ],
  },
  rules: [
    ruleRunner('email', 'Email Address', required, isEmail),
  ],
};

/************************************************
//
//  Login for class to render a working form
//  that can set up a session for an user.
//
************************************************/
class LoginForm extends Form {
  constructor(props) {
    super(props, params);
    this.state.isSuccessful = false;
  }

  pipeline = () => {
    const { onSuccess, onError } = this.props;
    this.setState({ isSuccessful: false });
    waterfall([
      stageNewsletterSignUp(0, this),
    ], (err) => {
      if (err) {
        if (onError) { onError(err); }
        this.setErrorResponse(err);
        console.log('[ERROR] Newsletter Sign Up Submit Pipeline failed!');
        return;
      }
      this.setState({
        isSuccessful: true,
        email: '',
      });
      if (onSuccess) { onSuccess(); }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit(this.pipeline)}
        className="form-inline newsletter"
      >
        <TextFieldInput
          customClasses="form-field"
          fieldClasses="form-control mb-2"
          placeholder="Enter your e-mail address"
          label=""
          showError={this.state.showErrors}
          text={this.state.email || ''}
          type="email"
          onFieldChanged={this.handleFieldChanged(['email', ['isSuccessful', false]])}
          errorText={this.errorFor('email')}
        />
        <button type="submit" className="btn mb-2">GO</button>
        { this.constructNonFieldErrors() }
        { this.constructSpinner() }
        {
          this.state.isSuccessful ? (
            <div className="message">
              <span>You have been successfully signed up!</span>
            </div>
          ) : null
        }
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default LoginForm;
