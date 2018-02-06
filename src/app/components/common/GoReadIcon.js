import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

export default class GoReadIcon extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  }

  render() {
    const { className, icon } = this.props;
    const classNames = className.split(' ');

    return (
      <span className={cls([...classNames, `GoReadIcon GoReadIcon--${icon}`])} />
    );
  }
}
