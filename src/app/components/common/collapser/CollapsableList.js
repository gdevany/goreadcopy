import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import cls from 'classnames';
import { Link } from 'react-router';

const parseLinkList = ({ id, isLink, action, text }) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

class CollapsableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { text, list, wrapperClass, children } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={cls('collapsable-list', wrapperClass)}>
        <div
          onClick={this.toggleCollapse}
          className="collapsable-list-header d-flex flex-row justify-content-between align-items-center"
        >
          <span className="collapsable-list-title">{text}</span>
          <FontAwesomeIcon  icon={isOpen ? faAngleUp : faAngleDown} />
        </div>
        <Collapse isOpen={isOpen}>
          <div className="collapsable-list-items d-flex flex-column justify-content-start align-items-start">
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

export default CollapsableList;
