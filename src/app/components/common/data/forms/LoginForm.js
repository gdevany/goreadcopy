import React from 'react';
import { waterfall } from 'async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Account as accountStages } from '../../../../pipelines';
import Form from './Form';
import PrimaryButton from '../../PrimaryButton';
import { TextFieldInput } from '../fields';
import { Auth as AuthActions, CurrentReader } from '../../../../redux/actions';
import { RuleManager, Rules } from '../validations';

const { stageLoginSubmit } = accountStages;
const { processUserLogin } = AuthActions;
const { getCurrentReader } = CurrentReader;
const { ruleRunner } = RuleManager;
const { required, minLength, isEmail } = Rules;

const params = {
  payloads: {
    LOGIN: [
      'username',
      'password',
    ],
  },
  rules: [
    ruleRunner('username', 'Email Address', required, isEmail),
    ruleRunner('password', 'Password', required, minLength(5)),
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
  }

  pipeline = () => {
    const { onSuccess, onError } = this.props;
    waterfall([
      stageLoginSubmit(0, this),
    ], (err) => {
      if (err) {
        if (onError) { onError(err); }
        this.setErrorResponse(err);
        console.log('[ERROR] Login Submit Pipeline failed!');
        return;
      }
      if (onSuccess) { onSuccess(); }
      this.props.getCurrentReader();
    });
  }

  render() {
    const { isBlocked } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit(this.pipeline)}
        className="form-wrapper general-font row"
      >
        <TextFieldInput
          placeholder=""
          label="Email Address"
          showError={this.state.showErrors}
          text={this.state.username || ''}
          type="email"
          onFieldChanged={this.handleFieldChanged(['username'])}
          errorText={this.errorFor('username')}
        />
        <TextFieldInput
          placeholder=""
          label="Password"
          showError={this.state.showErrors}
          text={this.state.password || ''}
          type="password"
          onFieldChanged={this.handleFieldChanged(['password'])}
          errorText={this.errorFor('password')}
        />
        { this.constructNonFieldErrors() }
        { this.constructSpinner() }
        <div className="small-12 columns center-text">
          <PrimaryButton
            label="Sign in with email"
            onClick={null}
            type="submit"
            disabled={isBlocked}
          />
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

const mapDispatchToProps = {
  processUserLogin,
  getCurrentReader,
};

export default connect(null, mapDispatchToProps)(LoginForm);
