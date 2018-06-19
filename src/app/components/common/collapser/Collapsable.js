import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import cls from 'classnames';

class Collapsable extends Component {
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
    const { text, wrapperClass, children } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={cls(wrapperClass, 'collapsable')}>
        <div
          onClick={this.toggleCollapse}
          className="collapsable-list-header d-flex flex-row justify-content-between align-items-center"
        >
          <span className="collapsable-list-title">{text}</span>
          <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
        </div>
        <Collapse isOpen={isOpen}>{children}</Collapse>
      </div>
    );
  }
}

export default Collapsable;
