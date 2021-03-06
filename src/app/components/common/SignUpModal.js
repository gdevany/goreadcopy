import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { ReaderData, Auth as AuthAct } from '../../redux/actions';
import { ExternalRoutes as routes } from '../../constants';
import { Colors } from '../../constants/style';
import { Auth as AuthServ } from '../../services';
import { BaseNavView } from '../views';
import PrimaryButton from './PrimaryButton';
import SocialButton from './SocialButton';
import WrappedField from './WrappedField';

const { cleanUserLoginErrors } = AuthAct;
const isUserLoggedIn = AuthServ.currentUserExists();

const { getInitialReaderData, checkFields, updateReaderData } = ReaderData;

const styles = {
  modalBody: {
    marginTop: -80,
    width: '100%',
  },

  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },

  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class SignUpModal extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      referrer: '',
      showLoader: false,
    };
  }

  componentWillMount = () => {
    if (!isUserLoggedIn) {
      const profileSlug = this.props.location.query.slug;
      if (profileSlug && this.state.referrer !== profileSlug) {
        this.setState({
          referrer: profileSlug,
        });
        this.props.updateReaderData({
          referrer: profileSlug,
        });
      }
    }
  }

  componentDidUpdate = () => {
    if (location.pathname === '/vid') {
      this.props.updateReaderData({
        affiliate: 'newHome',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const fields = R.pick(['firstName', 'lastName', 'email', 'referrer', 'affiliate'], this.props)
    this.setState({ showLoader: true });
    this.props.checkFields(fields)
      .then(() => {
        this.setState({ showLoader: false });
      });
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value });
    this.props.updateReaderData({ [field]: e.target.value });
  })

  handleCleanInputs = () => {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
    });
    this.props.cleanUserLoginErrors();
  }

  checkRedirectionQuery = () => (
    location.search.split('r=')[1] || '/'
  )

  render() {
    const {
      errors,
      modalOpen,
      handleClose,
      handleSubmit
    } = this.props;

    const {
      firstName,
      lastName,
      email,
      showLoader,
    } = this.state;

    const isFinished = (firstName !== '' && lastName !== '' && email !== '');

    return (
      <BaseNavView>
        <Helmet>
          <title>GoRead | SignUp</title>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '952697181431277');
              fbq('track', 'CompleteRegistration');
            `}
          </script>
          <noscript>
            {`
              <img
                height="1"
                width="1"
                style="display:none"
                src="https://www.facebook.com/tr?id=952697181431277&ev=PageView&noscript=1"
              />
            `}
          </noscript>
        </Helmet>
        <div className="row">
          <h1 className="center-text large-header top-container">
            Join GoRead
          </h1>
          <div className="center-text">
            <SocialButton
              href={routes.providerLogin({ provider: 'facebook' })}
              text="Sign up with Facebook"
              backgroundColor="#3B5998"
              icon="/image/facebook.png"
            />
            <SocialButton
              href={routes.providerLogin({ provider: 'google' })}
              text="Sign up with Google"
              backgroundColor="#EA4235"
              icon="/image/google.png"
            />
            <SocialButton
              href={routes.providerLogin({ provider: 'linkedin' })}
              text="Sign up with Linkedin"
              backgroundColor="#0077B5"
              icon="/image/linkedin.png"
            />
          </div>
          <h4 className="inner-title center-text">
            or sign up with email:
          </h4>
          <div className="form-container">
            <form onSubmit={this.handleSubmit} className="form-wrapper general-font">
              <WrappedField
                field="firstName"
                errors={errors}
              >
                <span className="form-label"> First name </span>
                <input
                  type="text"
                  className="form-input"
                  onChange={this.handleOnChange('firstName')}
                  value={firstName}
                />
              </WrappedField>
              <WrappedField
                field="lastName"
                errors={errors}
              >
                <span className="form-label"> Last name </span>
                <input
                  type="text"
                  className="form-input"
                  onChange={this.handleOnChange('lastName')}
                  value={lastName}
                />
              </WrappedField>
              <WrappedField
                field="email"
                errors={errors}
              >
                <span className="form-label"> Email </span>
                <input
                  type="text"
                  className="form-input"
                  onChange={this.handleOnChange('email')}
                  value={email}
                />
              </WrappedField>

              <WrappedField
                field="nonFieldErrors"
                errors={errors}
              />

              <div className="center-text">
                <PrimaryButton
                  disabled={!isFinished}
                  label="Sign up with email"
                  onClick={handleSubmit}
                  type="submit"
                />
              </div>
              {
                showLoader ? (
                  <div className="form-input-wrapper center-text">
                    <RefreshIndicator
                      size={50}
                      left={0}
                      top={0}
                      loadingColor={Colors.blue}
                      status="loading"
                      style={styles.refresh}
                    />
                  </div>
                ) : null
              }
            </form>
          </div>
        </div>
      </BaseNavView>
    );
  }
}

const mapStateToProps = R.prop('readerData');

const mapDispatchToProps = {
  getInitialReaderData,
  updateReaderData,
  checkFields,
  cleanUserLoginErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
