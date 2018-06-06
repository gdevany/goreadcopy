import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CollapsableList from '../collapser/CollapsableList';
import Collapsable from '../collapser/Collapsable';

const parseLinkList = ({ id, isLink, action, text }) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

class FooterColumn extends Component {
  showColumn = (show) => {
    const isLoggedIn = this.props.currentReader && this.props.currentReader.token;
    if ((isLoggedIn && show.whenLogged) || (!isLoggedIn && show.whenAnon)) return true;
    return false;
  }

  render() {
    const { title, items, children, show } = this.props;
    return this.showColumn(show) ? (
      <div className="footer-section d-flex flex-column justify-content-start align-items-center align-items-sm-start">
        <div className="w-100 d-block d-sm-none">
          {
            items ?
              <CollapsableList text={title} list={items} wrapperClass="footer-section-list" /> :
              <Collapsable text={title}>{children}</Collapsable>
          }
        </div>
        <div className="d-none d-sm-block">
          <span className="footer-section-header">{title}</span>
          <div className="d-flex flex-column justify-content-start align-items-center align-items-sm-start">
            {
              items ?
                items.map(parseLinkList) :
                children
            }
          </div>
        </div>
      </div>
    ) : null;
  }
}

FooterColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  show: PropTypes.shape({
    whenAnon: PropTypes.bool,
    whenLogged: PropTypes.bool,
  }),
};

FooterColumn.defaultProps = {
  children: null,
  show: {
    whenAnon: true,
    whenLogged: true,
  },
};


const mapStateToProps = ({ currentReader }) => ({ currentReader });

export default connect(mapStateToProps)(FooterColumn);
