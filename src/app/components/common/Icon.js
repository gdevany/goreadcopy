import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

export default class Icon extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  get iconClass() {
    const { icon } = this.props;

    return `gr-icon-${icon}`;
  }

  render() {
    const classNames = this.props.className.split(' ');

    return (
      <span className={cls([...classNames, this.iconClass])} />
    );
  }
}
