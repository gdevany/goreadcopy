import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

let i;

class EditorialReviews extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: {},
    };
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  componentWillReceiveProps = () => {
    const { bookInfo } = this.props;
    const editorial = bookInfo ? bookInfo.editorialReviews : null;
    const length = editorial ? editorial.length : null;
    if (length > 0) {
      for (i = 0; i < length; i += 1) {
        this.setState({
          isOpen: {
            [i]: false,
          },
        });
      }
    }
  }

  handleReviews = () => {
    const { bookInfo } = this.props;
    const editorialReviews = bookInfo ? bookInfo.editorialReviews : null;
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
    const { isOpen } = this.state;
    const description =
      item.description.length > 350 && !isOpen[index] ? `${item.description.substring(0, 350)}...` : item.description;
    return (
      <div key={index} className="review-item">
        <div className="review-description">
          &#34;{description}&#34;
          <a id={index} onClick={this.toggleDescription} className="review-toggle">
            {!isOpen[index] ? ' See More' : ' See Less' }
          </a>
          <p className="reviewer">
            <i>{item.reviewer}</i> {item.pubDate}
          </p>
        </div>
      </div>
    );
  }

  toggleDescription = (e) => {
    const { isOpen } = this.state;
    const index = e.target.id;
    this.setState({
      isOpen: {
        [index]: !isOpen[index],
      },
    });
  }

  render() {
    const { bookInfo } = this.props;
    const editorialReviews = bookInfo ? bookInfo.editorialReviews : null;
    const length = editorialReviews ? editorialReviews.length : null;
    return (
      <div className="columns review-container">
        { length > 0 ? (
          <h3 className="review-title">
            Editorial Reviews
          </h3>
          ) : null
        }
        {this.handleReviews()}
      </div>
    );
  }
}

EditorialReviews.propTypes = {
  bookInfo: PropTypes.object,
};

EditorialReviews.defaultProps = {
  bookInfo: null,
};

export default EditorialReviews;
