import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Books } from "../../../redux/actions";
import { Book } from "../../common";
import R from "ramda";

const styles = {};

const { getBookRecommendations } = Books;

class AuthorPageStore extends PureComponent {
  componentWillMount = () => {
    this.props.getBookRecommendations(4);
  };

  renderBooks(books) {
    return R.take(4, books).map(book => {
      return (
        <div style={styles.book} className="small-6 columns" key={book.id}>
          <Book book={book} />
        </div>
      );
    });
  }

  render() {
    const { recommended } = this.props;
    const books = recommended ? recommended.books : null;

    return (
      <div className="author-store-container">
        Some author store content
        <div>
          {books ? (
            this.renderBooks(books)
          ) : (
            <div className="loading-animation" />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentReader: { recommended } }) => {
  return { recommended };
};

export default connect(
  mapStateToProps,
  { getBookRecommendations }
)(AuthorPageStore);
