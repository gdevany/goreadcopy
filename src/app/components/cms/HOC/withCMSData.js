import { compose, getContext, mapProps } from 'recompose';
import propTypes from 'prop-types';


export default mapCMSToProps => compose(
  getContext({
    cms: propTypes.object,
  }),
  mapProps((props) => mapCMSToProps(props.cms)),
);
