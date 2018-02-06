import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';

export default class InterpunctedTextList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    renderItem: PropTypes.func,
  };

  static defaultProps = {
    renderItem: null,
    className: '',
  };

  getItemsToRender() {
    const { items } = this.props;

    return items.forEach((item, index) => {
      const isLast = index === items.length - 1;

      if (isLast) {
        return (<span key={`item-${item}`}>{this.renderItem(item, index, items)}</span>);
      }

      return (<span key={`item-${item}`}>{this.renderItem(item, index, items)} · </span>);
    });
  }

  renderItem(item, index, items) {
    const { renderItem } = this.props;

    return renderItem ? renderItem(item, index, items) : item;
  }

  render() {
    const { className } = this.props;
    const classNames = className.split(' ');

    return (
      <div className={cls([...classNames, 'InterpunctedTextList'])}>
        {this.getItemsToRender()}
      </div>
    );
  }
}
