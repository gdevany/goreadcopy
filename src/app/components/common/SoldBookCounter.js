import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountUp from 'react-countup';
import { Store } from '../../redux/actions';

const { getSoldBooks } = Store;

class SoldBookCounter extends Component {
  constructor(props) {
    super(props);
    if (!props.booksSold) props.getSoldBooks();
  }

  render() {
    return (
      <span style={{ color: 'blue' }}>
        {
          this.props.booksSold ?
            <CountUp start={0} end={this.props.booksSold} duration={2.5} /> :
            ' ...'
        }
      </span>
    );
  }
}

SoldBookCounter.propTypes = {
  booksSold: PropTypes.number.isRequired,
  getSoldBooks: PropTypes.func.isRequired,
};

SoldBookCounter.defaultProps = {};

const mapDispatchToProps = {
  getSoldBooks,
};

const mapStateToProps = ({
  store: {
    booksSold,
  },
}) => ({
  booksSold,
});

export default connect(mapStateToProps, mapDispatchToProps)(SoldBookCounter);
