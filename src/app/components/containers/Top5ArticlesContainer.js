import { connect } from 'react-redux';
import { getTop5Articles } from '../../redux/selectors/articles';

const mapStateToProps = state => ({
  articles: getTop5Articles(state),
});

export default connect(mapStateToProps);
