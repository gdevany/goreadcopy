import React, { Component } from 'react';
import CollapsableList from '../collapser/CollapsableList';
import Collapsable from '../collapser/Collapsable';

const parseLinkList = ({ id, isLink, action, text }) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

class FooterColumn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, items, children } = this.props;
    return (
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
    );
  }
}

export default FooterColumn;
