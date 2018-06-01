import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getPageContent } from '../../redux/actions/cms';



class CMSProvider extends React.Component {
  static childContextTypes = {
    cms: propTypes.any,
  }

  componentWillMount() {
    this.props.getPageContent({ page: this.props.page });
  }

  getChildContext() {
    return ({
      cms: this.props.cms,
    });
  }

  render() {
    return (
      <div className="CMSProvider">{this.props.children}</div>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.cms) {
    return ({ cms: {} });
  }

  return ({
    cms: state.cms.entities,
  });
};

const mapDispatchToProps = {
  getPageContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSProvider);
