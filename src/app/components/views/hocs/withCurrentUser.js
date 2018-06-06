import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Auth } from '../../../services';
import { Jwt } from '../../../services/api';
import { CurrentReader } from '../../../redux/actions';

const { verifyJwt } = Jwt;
const { getCurrentReader } = CurrentReader;

const mapStateToProps = ({
  currentReader,
}) => ({
  currentReader,
});

const mapDispatchToProps = {
  getCurrentReader,
};

const withCurrentUser = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      const token = Auth.token();
      if (token) {
        verifyJwt({ token })
          .then(() => {
            this.props.getCurrentReader();
          })
          // PENDING: implement flow for token refresh.
          .catch();
      }
    },
  }),
);

export default withCurrentUser;
