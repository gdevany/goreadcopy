import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Home from '../homev2/Home';
import { ReadFeed } from '../readFeed';
import { Auth as AuthActions } from '../../redux/actions';
import { Auth as AuthServices } from '../../services';
import FoundationApp from '../apps/FoundationApp';
import BootstrapApp from '../apps/BootstrapApp';

const { verifyUserToken } = AuthActions;

class HomeWrapper extends PureComponent {
  componentWillMount = () => {
    const token = AuthServices.token();
    if (token) {
      this.props.verifyUserToken({
        token,
      });
    }
  }

  render() {
    return AuthServices.currentUserExists() ? (
      <FoundationApp>
        <ReadFeed isMyReadFeed />
      </FoundationApp>
    ) : (
      <BootstrapApp>
        <Home />
      </BootstrapApp>
    );
  }
}

const mapStateToProps = ({ currentReader }) => {
  return {
    currentReader,
  };
};

export default connect(mapStateToProps, { verifyUserToken })(HomeWrapper);
