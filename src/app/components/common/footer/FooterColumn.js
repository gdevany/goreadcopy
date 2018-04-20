import React, { Component } from 'react';
import { Link } from 'react-router';
import { Collapse } from 'reactstrap';

const parseLinkList = ({ id, isLink, action, text }) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

class FooterColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  render() {
    const { header, list, children } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="footer-section d-flex flex-column justify-content-start align-items-center align-items-sm-start">
        <span className="footer-section-header">{header}</span>
        <Collapse isOpen={isOpen}>
          <div className="d-flex flex-column justify-content-start align-items-center align-items-sm-start">
            {
              list ?
                list.map(parseLinkList) :
                children
            }
          </div>
        </Collapse>
      </div>
    );
  }
}

export default FooterColumn;
