import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditorialReviews extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openDesc: false
    }
  }

  handleReviews = () => {
    const { bookInfo } = this.props;
    const editorialReviews = bookInfo ? bookInfo.editorialReviews : null
    const reviews = editorialReviews ? editorialReviews.map((item, index) => (
      this.handleItemReview(item, index)
    )) : null;
    return (
      <div className="review-item-container">
        {reviews}
      </div>
    );
  }

  handleItemReview = (item, index) => {
    const { openDesc } = this.state;
    const description =
      item.description.length > 150 && !openDesc ? `${item.description.substring(0, 150)}...` : item.description;
    return (
      <div key={index} className="review-item">
        <div className="review-description">
          &#34;<i>{description}</i>&#34;
          {!openDesc && item.description.length > 150 ? (
            <a onClick={this.toggleDescription}>Read More</a>
          ) : <a onClick={this.toggleDescription}>Read Less</a>}
          <p className="reviewer">
            <strong>{item.reviewer}</strong> {item.pubDate}
          </p>
        </div>
      </div>
    );
  }

  toggleDescription = (e) => {
    const { openDesc } = this.state;
    e.preventDefault();
    this.setState({
      openDesc: !openDesc,
    });
  }

  render() {
    return (
      <div className="large-6 columns review-container">
        <h3 className="review-title">
          Editorial Reviews
        </h3>
        {this.handleReviews()}
      </div>
    );
  }
}

EditorialReviews.propTypes = {
  editorialReviews: PropTypes.object,
};

EditorialReviews.defaultProps = {
  editorialReviews: null,
};

const mapStateToProps = ({
  store: {
    bookInfo
  },
}) => ({
  bookInfo,
});

export default connect(mapStateToProps)(EditorialReviews);
