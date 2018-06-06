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
      verifyJwt({ token })
        .then(() => {
          this.props.getCurrentReader();
        })
        .catch();
    },
  }),
);

export default withCurrentUser;
